import { runStateSchema, type EngineEvent, type RunState } from "../schemas";
import { createContextRngState, createInitialRngState } from "../core/rng";
import { createRunLogId } from "../core/ids";
import { createInitialHeroState } from "./createInitialHeroState";
import { selectZone } from "../systems/encounters/zones/selectZone";
import { createTownState } from "./createTownState";
import { ClassId } from "@app/content";
import { STARTING_GOLD, STARTING_LEVEL_UP_REROLLS } from "./runDefaults";

export type CreateInitialRunStateInput = {
	runId: string;
	seed: string;
	heroName: string;
	classId: ClassId;
};

export function createInitialRunState(input: CreateInitialRunStateInput): {
	state: RunState;
	events: EngineEvent[];
} {
	const initialRngState = createInitialRngState(input.seed);

	const heroResult = createInitialHeroState({
		runId: input.runId,
		heroName: input.heroName,
		classId: input.classId,
		seed: input.seed,
	});

	const hero = heroResult;
	const zoneNumber = 1;
	const zoneRngState = createContextRngState(input.seed, "zone", zoneNumber);
	const zone = selectZone(zoneNumber, zoneRngState);
	const battleNumber = 1;
	const endlessCycle = 0;

	const town = createTownState({
		runId: input.runId,
		hero,
		seed: input.seed,
		battleNumber,
		zoneNumber,
		shopLocks: [],
	});

	const state: RunState = {
		version: 2,

		id: input.runId,

		seed: input.seed,
		rngState: initialRngState,

		phase: "town",

		battleNumber,
		zoneNumber,
		zone,
		endlessCycle,
		day: 1,
		kills: 0,
		hasDefeatedFinalBoss: false,

		hero,

		combat: null,

		town,
		shopLocks: [],

		gold: STARTING_GOLD,
		levelUpRerolls: STARTING_LEVEL_UP_REROLLS,
		streak: 0,

		log: [
			{
				id: createRunLogId(input.runId, 1),
				message: `Run started for ${input.heroName}.`,
				eventType: "run_started",
			},
		],

		pendingRewardChoice: null,
	};

	return {
		state: runStateSchema.parse(state),
		events: [{ type: "RUN_STARTED" }],
	};
}
