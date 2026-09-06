import { Types, type ClientSession } from "mongoose";
import {
	createSystemGhostEncounter,
	type GhostEncounter,
	type HeroState,
	type RunState,
} from "@app/engine";
import { GhostModel } from "../models/ghost.model";
import { UserModel } from "../models/user.model";

const FIRST_BOSS_BATTLE_NUMBER = 10;
const FINAL_NORMAL_ENCOUNTER_LEVEL = 10;
const GHOST_ENCOUNTER_CHANCE = 0.05;
const UNKNOWN_GHOST_USERNAME = "Unknown";

type CreateGhostFromRunInput = {
	season: number;
	userId: string;
	runId: Types.ObjectId;
	state: RunState;
	session: ClientSession;
};

type IncrementGhostEncounterInput = {
	ghostId: string;
	session: ClientSession;
};

type RecordGhostCombatOutcomeInput = {
	ghostId: string;
	outcome: "ghost_won" | "ghost_lost";
	banishedBy: {
		sourceId: string;
		heroName: string;
		classId: HeroState["classId"];
		heroLevel: number;
	};
	session: ClientSession;
};

type SelectGhostEncounterInput = {
	season: number;
	encounterLevel: number;
	seed: string;
	battleNumber: number;
	ghostPoolCutoff: Date;
	defeatedGhostIds: string[];
};

export async function createGhostFromRunIfEligible(input: CreateGhostFromRunInput) {
	if (!isGhostEligible(input.state)) {
		return null;
	}

	return GhostModel.findOneAndUpdate(
		{
			sourceRunId: input.runId,
		},
		{
			$setOnInsert: {
				season: input.season,
				userId: input.userId,
				sourceRunId: input.runId,
				name: input.state.hero.name,
				classId: input.state.hero.classId,
				heroLevel: input.state.hero.level,
				encounterLevel: input.state.zoneNumber,
				status: "active",
				banishedAt: null,
				banishedBy: null,
				snapshot: createGhostSnapshot(input.state),
				stats: {
					kills: 0,
					deaths: 0,
					encounters: 0,
				},
			},
		},
		{
			returnDocument: "after",
			upsert: true,
			session: input.session,
		},
	);
}

export async function selectGhostEncounter(
	input: SelectGhostEncounterInput,
): Promise<GhostEncounter | null> {
	const selectionKey = `${input.seed}:ghost:${input.battleNumber}`;
	if (getDeterministicFraction(`${selectionKey}:chance`) >= GHOST_ENCOUNTER_CHANCE) {
		return null;
	}

	const filter = {
		season: input.season,
		encounterLevel: getPlayerGhostEncounterLevelFilter(input.encounterLevel),
		createdAt: { $lt: input.ghostPoolCutoff },
		$or: [{ banishedAt: null }, { banishedAt: { $gte: input.ghostPoolCutoff } }],
		_id: {
			$nin: input.defeatedGhostIds.filter((ghostId) => Types.ObjectId.isValid(ghostId)),
		},
	};
	const count = await GhostModel.countDocuments(filter);
	if (count === 0) {
		return selectSystemGhostEncounter(input.encounterLevel, input.defeatedGhostIds);
	}

	const index = selectDescendingWeightedIndex(
		count,
		getDeterministicFraction(`${selectionKey}:selection`),
	);
	const ghost = await GhostModel.findOne(filter)
		.sort({ createdAt: -1, _id: 1 })
		.skip(index)
		.select("_id userId snapshot.hero")
		.lean();
	if (!ghost) {
		return selectSystemGhostEncounter(input.encounterLevel, input.defeatedGhostIds);
	}

	const owner = await UserModel.findById(ghost.userId).select("displayName").lean();
	return {
		ghostId: String(ghost._id),
		ghostUsername: owner?.displayName?.trim() || UNKNOWN_GHOST_USERNAME,
		ghostSource: "player",
		hero: ghost.snapshot.hero,
	};
}

function getPlayerGhostEncounterLevelFilter(encounterLevel: number) {
	return encounterLevel > FINAL_NORMAL_ENCOUNTER_LEVEL
		? { $gt: FINAL_NORMAL_ENCOUNTER_LEVEL }
		: encounterLevel;
}

export async function incrementGhostEncounters(input: IncrementGhostEncounterInput) {
	await GhostModel.updateOne(
		{
			_id: input.ghostId,
		},
		{
			$inc: {
				"stats.encounters": 1,
			},
		},
		{
			session: input.session,
		},
	);
}

export async function recordGhostCombatOutcome(input: RecordGhostCombatOutcomeInput) {
	const ghost = await GhostModel.findOneAndUpdate(
		{
			_id: input.ghostId,
		},
		{
			$inc:
				input.outcome === "ghost_won"
					? {
							"stats.kills": 1,
						}
					: {
							"stats.deaths": 1,
						},
		},
		{
			returnDocument: "after",
			session: input.session,
		},
	);

	if (input.outcome === "ghost_lost") {
		await GhostModel.updateOne(
			{ _id: input.ghostId, status: "active" },
			{
				$set: {
					status: "banished",
					banishedAt: new Date(),
					banishedBy: input.banishedBy,
				},
			},
			{ session: input.session },
		);
	}

	return ghost;
}

function selectSystemGhostEncounter(
	encounterLevel: number,
	defeatedGhostIds: string[],
): GhostEncounter | null {
	if (encounterLevel > FINAL_NORMAL_ENCOUNTER_LEVEL) {
		return null;
	}

	const encounter = createSystemGhostEncounter(encounterLevel);
	return defeatedGhostIds.includes(encounter.ghostId) ? null : encounter;
}

function isGhostEligible(state: RunState): boolean {
	return state.battleNumber > FIRST_BOSS_BATTLE_NUMBER;
}

function createGhostSnapshot(state: RunState): { hero: HeroState; createdFrom: unknown } {
	return {
		hero: {
			...state.hero,
			currentHp: state.hero.maxHp,
			pendingLevelUp: null,
		},
		createdFrom: {
			battleNumber: state.battleNumber,
			zoneNumber: state.zoneNumber,
			endlessCycle: state.endlessCycle,
			phase: state.phase,
		},
	};
}

function getDeterministicFraction(key: string): number {
	let hash = 2166136261;
	for (let index = 0; index < key.length; index += 1) {
		hash ^= key.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0) / 4_294_967_296;
}

function selectDescendingWeightedIndex(itemCount: number, fraction: number): number {
	let roll = fraction * ((itemCount * (itemCount + 1)) / 2);
	for (let index = 0; index < itemCount; index += 1) {
		roll -= itemCount - index;
		if (roll <= 0) {
			return index;
		}
	}
	return itemCount - 1;
}
