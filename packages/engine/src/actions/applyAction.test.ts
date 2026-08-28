import { describe, expect, it } from "vitest";
import { applyAction } from "./applyAction";
import {
	addPlayerStatus,
	createTestRunState,
	modifyTestRunState,
} from "../test/createTestRunState";

describe("applyAction", () => {
	it("is deterministic and does not mutate its input", () => {
		const state = createTestRunState();
		const original = structuredClone(state);
		const action = { type: "PLAYER_SKIP_TURN" } as const;

		expect(applyAction(state, action)).toEqual(applyAction(state, action));
		expect(state).toEqual(original);
	});

	it("resolves both actors and advances the combat turn", () => {
		const state = createTestRunState();

		const result = applyAction(state, { type: "PLAYER_SKIP_TURN" });

		expect(result.ok).toBe(true);
		expect(result.state.combat).toMatchObject({
			turnNumber: state.combat!.turnNumber + 1,
			activeActor: "player",
			status: "active",
		});
		expect(result.events).toContainEqual({ type: "COMBAT_TURN_RESOLVED" });
		expect(result.state.combat!.log).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ actor: "player", eventType: "turn_skipped" }),
				expect.objectContaining({ actor: "enemy" }),
			]),
		);
	});

	it("rejects combat actions when combat is unavailable and preserves state", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			draft.phase = "town";
			draft.combat = null;
		});

		const result = applyAction(state, { type: "PLAYER_BASIC_ATTACK" });

		expect(result).toEqual({
			ok: false,
			state,
			events: [],
			error: "COMBAT_NOT_ACTIVE",
		});
	});

	it("prevents a stunned player from attacking", () => {
		const state = addPlayerStatus(createTestRunState(), "stunned");

		const result = applyAction(state, { type: "PLAYER_BASIC_ATTACK" });

		expect(result).toMatchObject({ ok: false, error: "PLAYER_CANNOT_ACT", state });
	});

	it("prevents a silenced player from using a skill", () => {
		const state = addPlayerStatus(createTestRunState(), "silenced");

		const result = applyAction(state, {
			type: "PLAYER_USE_SKILL",
			skillId: "armour_break",
		});

		expect(result).toMatchObject({ ok: false, error: "PLAYER_IS_SILENCED", state });
	});

	it("rejects a skill the player does not know", () => {
		const state = createTestRunState();

		const result = applyAction(state, {
			type: "PLAYER_USE_SKILL",
			skillId: "fireball",
		});

		expect(result).toMatchObject({ ok: false, error: "SKILL_NOT_KNOWN", state });
	});

	it("resolves victory and rewards after a lethal basic attack", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			if (!draft.combat) {
				throw new Error("Expected test run to have combat");
			}

			draft.combat.enemy.maxHp = 1;
			draft.combat.enemy.currentHp = 1;
			draft.combat.enemy.combatStats.armourClass = 0;
			draft.combat.enemy.combatStats.damageAffinities = {
				resistances: [],
				immunities: [],
				vulnerabilities: [],
			};
			draft.combat.player.combatStats.attackRollBonus = 100;
		});

		const result = applyAction(state, { type: "PLAYER_BASIC_ATTACK" });

		expect(result.ok).toBe(true);
		expect(result.state.kills).toBe(state.kills + 1);
		expect(result.state.combat?.status).toBe("player_won");
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "COMBAT_ENDED",
				outcome: "victory",
				combatId: state.combat?.id,
				battleNumber: state.battleNumber,
				encounterType: state.combat?.encounterType,
				enemySourceId: state.combat?.enemy.sourceId,
				turnNumber: state.combat?.turnNumber,
				defeatedFinalBoss: false,
				completedEndlessCycle: false,
				finishingPlayerAction: {
					type: "basic_attack",
					targetStartedAtFullHp: true,
				},
				reward: expect.any(Object),
			}),
		);
	});

	it("moves the run to dead after a lethal enemy response", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			if (!draft.combat) {
				throw new Error("Expected test run to have combat");
			}

			draft.combat.player.currentHp = 1;
			draft.combat.player.combatStats.armourClass = 0;
			draft.combat.player.combatStats.damageAffinities = {
				resistances: [],
				immunities: [],
				vulnerabilities: [],
			};
			draft.combat.enemy.combatStats.attackRollBonus = 100;
			draft.combat.enemy.skills = [];
		});

		const result = applyAction(state, { type: "PLAYER_SKIP_TURN" });

		expect(result.ok).toBe(true);
		expect(result.state.phase).toBe("dead");
		expect(result.state.combat?.status).toBe("enemy_won");
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "COMBAT_ENDED",
				outcome: "defeat",
				combatId: state.combat?.id,
				battleNumber: state.battleNumber,
				encounterType: state.combat?.encounterType,
				enemySourceId: state.combat?.enemy.sourceId,
				turnNumber: state.combat?.turnNumber,
			}),
		);
	});

	it("reports newly offered build choices after a boss victory", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			if (!draft.combat) {
				throw new Error("Expected test run to have combat");
			}

			draft.battleNumber = 10;
			draft.hero.level = 2;
			draft.hero.xp = 999;
			draft.combat.encounterType = "boss";
			draft.combat.enemy.maxHp = 1;
			draft.combat.enemy.currentHp = 1;
			draft.combat.enemy.combatStats.armourClass = 0;
			draft.combat.player.combatStats.attackRollBonus = 100;
		});

		const result = applyAction(state, { type: "PLAYER_BASIC_ATTACK" });
		const skillOffers = result.events.filter((event) => event.type === "SKILL_OFFERED");
		const itemOffers = result.events.filter((event) => event.type === "ITEM_OFFERED");

		expect(skillOffers.map((event) => event.skillId)).toEqual(
			result.state.hero.pendingLevelUp?.options.flatMap((option) =>
				option.type === "skill" ? [option.skillId] : [],
			),
		);
		expect(itemOffers).toHaveLength(2);
		expect(itemOffers).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ source: "reward", battleNumber: 10 }),
			]),
		);
	});

	it("records a lethal skill as the finishing player action", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			if (!draft.combat) {
				throw new Error("Expected test run to have combat");
			}

			draft.combat.enemy.maxHp = 1;
			draft.combat.enemy.currentHp = 1;
			draft.combat.enemy.attributes.strength = 1;
			draft.combat.enemy.savingThrowProficiencies = [];
		});

		const result = applyAction(state, {
			type: "PLAYER_USE_SKILL",
			skillId: "armour_break",
		});

		expect(result.events).toContainEqual({
			type: "SKILL_USED",
			skillId: "armour_break",
			combatId: state.combat?.id,
			battleNumber: state.battleNumber,
			encounterType: state.combat?.encounterType,
			enemySourceId: state.combat?.enemy.sourceId,
			turnNumber: state.combat?.turnNumber,
		});
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "COMBAT_ENDED",
				outcome: "victory",
				finishingPlayerAction: {
					type: "skill",
					targetStartedAtFullHp: true,
				},
			}),
		);
	});

	it("records when a finishing action started against a damaged enemy", () => {
		const state = modifyTestRunState(createTestRunState(), (draft) => {
			if (!draft.combat) {
				throw new Error("Expected test run to have combat");
			}

			draft.combat.enemy.maxHp = 2;
			draft.combat.enemy.currentHp = 1;
			draft.combat.enemy.combatStats.armourClass = 0;
			draft.combat.player.combatStats.attackRollBonus = 100;
		});

		const result = applyAction(state, { type: "PLAYER_BASIC_ATTACK" });

		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "COMBAT_ENDED",
				outcome: "victory",
				finishingPlayerAction: {
					type: "basic_attack",
					targetStartedAtFullHp: false,
				},
			}),
		);
	});
});
