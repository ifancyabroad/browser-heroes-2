import { runStateSchema, type RunState } from "../schemas";
import { createInitialRngState } from "../core/rng";
import { createRunLogId } from "../core/ids";
import { createInitialHeroState } from "./createInitialHeroState";
import { createCombat } from "../systems/combat/createCombat";
import { ClassId } from "@app/content";
import { STARTING_LEVEL_UP_REROLLS } from "../systems/progression/constants/levelUpRerolls";

export type CreateInitialRunStateInput = {
	runId: string;
	seed: string;
	heroName: string;
	classId: ClassId;
};

export function createInitialRunState(input: CreateInitialRunStateInput): RunState {
	const initialRngState = createInitialRngState(input.seed);

	const heroResult = createInitialHeroState({
		runId: input.runId,
		heroName: input.heroName,
		classId: input.classId,
		seed: input.seed,
		rngState: initialRngState,
	});

	const hero = heroResult.value;
	const zoneNumber = 1;
	const battleNumber = 1;
	const endlessCycle = 0;

	const combatResult = createCombat({
		runId: input.runId,
		hero,
		seed: input.seed,
		battleNumber,
		zoneNumber,
		endlessCycle,
		rngState: heroResult.rngState,
	});

	if (!combatResult) {
		throw new Error("Unable to create initial combat: NO_ELIGIBLE_ENEMY");
	}

	const state: RunState = {
		version: 1,

		id: input.runId,

		seed: input.seed,
		rngState: combatResult.rngState,

		phase: "combat",

		battleNumber,
		zoneNumber,
		endlessCycle,
		day: 1,
		kills: 0,
		hasDefeatedFinalBoss: false,

		hero,

		combat: combatResult.value,

		town: null,
		shopLocks: [],

		gold: 0,
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

	return runStateSchema.parse(state);
}
