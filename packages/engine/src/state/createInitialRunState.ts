import { runStateSchema, type RunState } from "../schemas";
import { createInitialRngState } from "../core/rng";
import { createRunLogId } from "../core/ids";
import { createInitialHeroState } from "./createInitialHeroState";
import { createTownState } from "./createTownState";
import { ClassId } from "@app/content";

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
		rngState: initialRngState,
	});

	const hero = heroResult.value;
	const zoneNumber = 1;

	const town = createTownState({
		runId: input.runId,
		hero,
		zoneNumber,
		battleNumber: 1,
		day: 1,
		rngState: heroResult.rngState,
	});

	const state: RunState = {
		version: 1,

		id: input.runId,

		seed: input.seed,
		rngState: town.rngState,

		phase: "town",

		battleNumber: 1,
		zoneNumber,
		endlessCycle: 0,
		day: 1,
		kills: 0,

		hero,

		combat: null,

		town: town.value,

		gold: 0,
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
