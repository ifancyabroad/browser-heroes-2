import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	createTestRunState,
	createTestVictoryState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("continueToNextCombat", () => {
	it("advances battle state and starts a deterministic encounter", () => {
		const state = createTestVictoryState();

		const first = applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" });
		const second = applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" });

		expect(first).toEqual(second);
		expect(first.ok).toBe(true);
		expect(first.state).toMatchObject({
			phase: "combat",
			battleNumber: 2,
			zoneNumber: 1,
			endlessCycle: 0,
			streak: 1,
			town: null,
			combat: {
				status: "active",
				turnNumber: 1,
			},
		});
		expect(first.events).toEqual([
			{ type: "NEXT_COMBAT_READY" },
			expect.objectContaining({ type: "COMBAT_STARTED" }),
		]);
	});

	it("selects the same encounter without consuming differing combat RNG states", () => {
		const firstState = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.rngState = { value: 1 };
		});
		const secondState = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.rngState = { value: 4_000_000_000 };
		});

		const first = applyAction(firstState, { type: "CONTINUE_TO_NEXT_COMBAT" });
		const second = applyAction(secondState, { type: "CONTINUE_TO_NEXT_COMBAT" });

		expect(first.state.combat?.enemy.sourceId).toBe(second.state.combat?.enemy.sourceId);
		expect(first.state.rngState).toEqual(firstState.rngState);
		expect(second.state.rngState).toEqual(secondState.rngState);
	});

	it("rejects continuation before victory", () => {
		const state = createTestRunState();

		expect(applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" })).toEqual({
			ok: false,
			state,
			events: [],
			error: "INVALID_PHASE",
		});
	});

	it("preserves a ghost owner's name in combat state", () => {
		const state = createTestVictoryState();
		const result = applyAction(
			state,
			{ type: "CONTINUE_TO_NEXT_COMBAT" },
			{
				ghostEncounter: {
					ghostId: "ghost-id",
					ghostUsername: "Ghost Owner",
					hero: structuredClone(state.hero),
				},
			},
		);

		expect(result.ok).toBe(true);
		expect(result.state.combat).toMatchObject({
			encounterType: "ghost",
			ghostUsername: "Ghost Owner",
		});
	});

	it("blocks continuation while a level-up is pending", () => {
		const state = modifyTestRunState(createTestVictoryState(), (draft) => {
			draft.hero.pendingLevelUp = {
				level: 2,
				hpGain: 9,
				rerollIndex: 0,
				options: [],
			};
		});

		expect(applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" })).toMatchObject({
			ok: false,
			error: "LEVEL_UP_REQUIRED",
			state,
		});
	});

	it("carries and advances only surviving battle-duration effects on the player", () => {
		const state = modifyTestRunState(createTestVictoryState(), (draft) => {
			const player = draft.combat!.player;
			const enemy = draft.combat!.enemy;
			player.activeEffects.push(
				{
					id: "armour",
					type: "modifyStat",
					sourceCombatantId: player.id,
					sourceSide: "player",
					source: {
						type: "skill",
						skillId: "armour",
						sourceName: "Armour",
						sourceEffectKey: "effect:0",
					},
					duration: { unit: "battles", remaining: 3 },
					stat: "armourClass",
					value: 6,
				},
				{
					id: "expiring-debuff",
					type: "status",
					sourceCombatantId: enemy.id,
					sourceSide: "enemy",
					source: {
						type: "skill",
						skillId: "blind",
						sourceName: "Blind",
						sourceEffectKey: "effect:0",
					},
					duration: { unit: "battles", remaining: 1 },
					statusId: "silenced",
				},
				{
					id: "turn-effect",
					type: "status",
					sourceCombatantId: enemy.id,
					sourceSide: "enemy",
					source: {
						type: "skill",
						skillId: "blind",
						sourceName: "Blind",
						sourceEffectKey: "effect:1",
					},
					duration: { unit: "turns", remaining: 8 },
					statusId: "stunned",
				},
			);
		});

		const result = applyAction(state, { type: "CONTINUE_TO_NEXT_COMBAT" });

		expect(result.ok).toBe(true);
		expect(result.state.combat!.player.activeEffects).toEqual([
			expect.objectContaining({
				id: "armour",
				sourceCombatantId: result.state.combat!.player.id,
				duration: { unit: "battles", remaining: 2 },
			}),
		]);
	});
});
