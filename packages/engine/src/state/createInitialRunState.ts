import { runStateSchema, type RunState } from "../schemas";
import { createInitialRngState } from "../core/rng";
import { createRunLogId } from "../core/ids";
import { createInitialHeroState } from "./createInitialHeroState";
import { createInitialTownState } from "./createInitialTownState";
import { ClassId } from "@app/content";

export type CreateInitialRunStateInput = {
	runId: string;
	seed: string;
	heroName: string;
	classId: ClassId;
};

export function createInitialRunState(input: CreateInitialRunStateInput): RunState {
	const hero = createInitialHeroState({
		heroName: input.heroName,
		classId: input.classId,
	});

	const state: RunState = {
		version: 1,

		id: input.runId,

		seed: input.seed,
		rngState: createInitialRngState(input.seed),

		phase: "town",

		battleNumber: 1,
		zoneNumber: 1,
		endlessCycle: 0,

		hero,

		combat: null,

		town: createInitialTownState(),

		gold: 0,
		streak: 0,

		log: [
			{
				id: createRunLogId(input.runId, 1),
				message: `Run started for ${hero.name}.`,
				eventType: "run_started",
			},
		],
	};

	return runStateSchema.parse(state);
}
