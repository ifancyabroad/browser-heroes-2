import { applyAction, createInitialRunState, runStateSchema, type RunState } from "../index";

const TEST_RUN_INPUT = {
	runId: "test-run",
	seed: "test-seed",
	heroName: "Test Hero",
	classId: "warrior",
} as const;

export function createTestRunState(): RunState {
	return createInitialRunState(TEST_RUN_INPUT);
}

export function createTestVictoryState(): RunState {
	return modifyTestRunState(createTestRunState(), (draft) => {
		if (!draft.combat) {
			throw new Error("Expected test run to have combat");
		}

		draft.combat.status = "player_won";
		draft.combat.enemy.currentHp = 0;
	});
}

export function createTestTownState(): RunState {
	const result = applyAction(createTestVictoryState(), { type: "RETURN_TO_TOWN" });

	if (!result.ok) {
		throw new Error(`Unable to create test town state: ${result.error}`);
	}

	return result.state;
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
