import { createInitialRunState, runStateSchema, type RunState } from "../index";

const TEST_RUN_INPUT = {
	runId: "test-run",
	seed: "test-seed",
	heroName: "Test Hero",
	classId: "fighter",
} as const;

export function createTestRunState(): RunState {
	return createInitialRunState(TEST_RUN_INPUT);
}

export function modifyTestRunState(state: RunState, modify: (draft: RunState) => void): RunState {
	const draft = structuredClone(state);
	modify(draft);
	return runStateSchema.parse(draft);
}

export function addPlayerStatus(state: RunState, statusId: "stunned" | "silenced"): RunState {
	return modifyTestRunState(state, (draft) => {
		if (!draft.combat) {
			throw new Error("Expected test run to have combat");
		}

		draft.combat.player.activeEffects.push({
			id: `test-${statusId}`,
			type: "status",
			sourceCombatantId: draft.combat.enemy.id,
			source: {
				type: "skill",
				skillId: "armour_break",
				sourceName: `Test ${statusId}`,
				sourceEffectKey: `test-${statusId}`,
			},
			remainingTurns: 1,
			statusId,
		});
	});
}
