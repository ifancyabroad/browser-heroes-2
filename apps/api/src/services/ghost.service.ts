import type { ClientSession, Types } from "mongoose";
import type { HeroState, RunState } from "@app/engine";
import { GhostModel } from "../models/ghost.model";

const FIRST_BOSS_BATTLE_NUMBER = 10;
const MAX_ENCOUNTER_LEVEL = 10;
const GHOST_ENCOUNTER_CHANCE = 0.05;

type CreateGhostFromRunInput = {
	userId: string;
	runId: Types.ObjectId;
	state: RunState;
	session: ClientSession;
};

type GhostEncounterInput = {
	ghostId: string;
	hero: HeroState;
};

type SelectGhostEncounterInput = {
	encounterLevel: number;
	excludeUserId?: string;
};

type IncrementGhostEncounterInput = {
	ghostId: string;
	session: ClientSession;
};

type RecordGhostCombatOutcomeInput = {
	ghostId: string;
	outcome: "ghost_won" | "ghost_lost";
	session: ClientSession;
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
				userId: input.userId,
				sourceRunId: input.runId,
				name: input.state.hero.name,
				classId: input.state.hero.classId,
				heroLevel: input.state.hero.level,
				encounterLevel: getGhostEncounterLevel(input.state),
				snapshot: createGhostSnapshot(input.state),
				stats: {
					kills: 0,
					deaths: 0,
					encounters: 0,
				},
			},
		},
		{
			new: true,
			upsert: true,
			session: input.session,
		},
	);
}

export async function selectGhostEncounterForLevel(
	input: SelectGhostEncounterInput,
): Promise<GhostEncounterInput | null> {
	if (Math.random() >= GHOST_ENCOUNTER_CHANCE) {
		return null;
	}

	const ghosts = await GhostModel.find({
		encounterLevel: input.encounterLevel,
		...(input.excludeUserId ? { userId: { $ne: input.excludeUserId } } : {}),
	})
		.sort({ createdAt: -1 })
		.lean();

	if (ghosts.length === 0) {
		return null;
	}

	const ghost = selectWeightedRecentGhost(ghosts);

	return {
		ghostId: String(ghost._id),
		hero: ghost.snapshot.hero,
	};
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
	await GhostModel.updateOne(
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
			session: input.session,
		},
	);
}

function isGhostEligible(state: RunState): boolean {
	return state.battleNumber > FIRST_BOSS_BATTLE_NUMBER;
}

function getGhostEncounterLevel(state: RunState): number {
	return Math.min(state.hero.level, MAX_ENCOUNTER_LEVEL);
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

function selectWeightedRecentGhost<T>(items: readonly T[]): T {
	const weightedItems = items.map((item, index) => ({
		item,
		weight: items.length - index,
	}));

	const totalWeight = weightedItems.reduce((sum, entry) => sum + entry.weight, 0);

	let roll = Math.random() * totalWeight;

	for (const entry of weightedItems) {
		roll -= entry.weight;

		if (roll <= 0) {
			return entry.item;
		}
	}

	return weightedItems[weightedItems.length - 1].item;
}
