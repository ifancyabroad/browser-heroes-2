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
	const rngState = createInitialRngState(input.seed);
	const hero = createInitialHeroState(input);
	const zoneNumber = 1;

	const town = createTownState({
		runId: input.runId,
		hero,
		zoneNumber,
		rngState,
	});

	const state: RunState = {
		version: 1,

		id: input.runId,

		seed: input.seed,
		rngState: createInitialRngState(input.seed),

		phase: "town",

		battleNumber: 1,
		zoneNumber,
		endlessCycle: 0,

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
