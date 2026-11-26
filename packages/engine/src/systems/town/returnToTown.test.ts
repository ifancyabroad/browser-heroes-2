import { resolveConsumableEffects } from "../consumables/resolveConsumableEffects";
import { CONSUMABLES_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	addPlayerStatus,
	createTestCombatState,
	createTestTownState,
	createTestVictoryState,
} from "../../test/createTestRunState";
import { getItemInstanceDefinition } from "../items/getItemInstanceDefinition";
import { selectAvailableActions } from "../../selectors";
import { runStateSchema } from "../../schemas";

describe("returnToTown", () => {
	it("advances the run, resets the streak, and creates a deterministic shop", () => {
		const state = {
			...createTestVictoryState(),
			streak: 4,
		};

		const first = applyAction(state, { type: "RETURN_TO_TOWN" });
		const second = applyAction(state, { type: "RETURN_TO_TOWN" });

		expect(first).toEqual(second);
		expect(first.ok).toBe(true);
		expect(first.state).toMatchObject({
			phase: "town",
			combat: null,
			battleNumber: 2,
			zoneNumber: 1,
			endlessCycle: 0,
			streak: 0,
			town: {
				rerollCount: 0,
				shopLevel: 1,
			},
		});
		expect(first.state.town?.shopSlots.length).toBeGreaterThan(0);
		for (const slot of first.state.town?.shopSlots ?? []) {
			const item = getItemInstanceDefinition(slot.item);
			const min = Math.round((item.price * 90) / 500) * 5;
			const max = Math.round((item.price * 110) / 500) * 5;

			expect(slot.price).toBeGreaterThanOrEqual(min);
			expect(slot.price).toBeLessThanOrEqual(max);
			expect(slot.price % 5).toBe(0);
		}
		expect(first.events).toEqual([{ type: "RETURNED_TO_TOWN" }]);
	});

	it("rejects returning during active combat without invisibility", () => {
		const state = createTestCombatState();

		expect(applyAction(state, { type: "RETURN_TO_TOWN" })).toMatchObject({
			ok: false,
			error: "INVALID_PHASE",
			state,
		});
	});

	it("escapes without advancing, rewarding, healing, or resolving another turn", () => {
		const entered = applyAction(createTestTownState(), { type: "ENTER_COMBAT" });
		const state = addPlayerStatus(addPlayerStatus(entered.state, "invisible"), "haste");
		state.streak = 4;
		state.hero.currentHp = 1;
		state.combat!.player.currentHp = 1;
		state.hero.skills[0].chargesRemaining = 0;
		state.combat!.player.skills[0].chargesRemaining = 0;
		state.combat!.enemy.currentHp = 1;
		const original = structuredClone(state);

		const escaped = applyAction(state, { type: "RETURN_TO_TOWN" });

		expect(escaped.ok).toBe(true);
		expect(escaped.state).toEqual({ ...state, phase: "town", combat: null, streak: 0 });
		expect(escaped.events).toEqual([{ type: "RETURNED_TO_TOWN" }]);
		expect(state).toEqual(original);

		const retry = applyAction(escaped.state, { type: "ENTER_COMBAT" });
		expect(retry.ok).toBe(true);
		expect(retry.state.combat!.enemy.sourceId).toBe(state.combat!.enemy.sourceId);
		expect(retry.state.combat!.enemy.currentHp).toBe(retry.state.combat!.enemy.maxHp);
		expect(retry.state.combat!.turnNumber).toBe(1);
		expect(retry.state.combat!.player.currentHp).toBe(1);
		expect(retry.state.combat!.player.skills[0].chargesRemaining).toBe(0);
		expect(retry.state.combat!.player.activeEffects).toEqual([]);
	});

	it("preserves purchases, rerolls, and locks through saved combat and repeated escapes", () => {
		const initialTown = createTestTownState();
		initialTown.gold = 100_000;
		const rerolled = applyAction(initialTown, { type: "REROLL_SHOP" });
		expect(rerolled.ok).toBe(true);
		const buyAction = selectAvailableActions(rerolled.state).find(
			(action) => action.type === "BUY_ITEM",
		);
		if (!buyAction || buyAction.type !== "BUY_ITEM") {
			throw new Error("Expected an available buy action");
		}
		const purchased = applyAction(rerolled.state, buyAction);
		expect(purchased.ok).toBe(true);
		const lockAction = selectAvailableActions(purchased.state).find(
			(action) => action.type === "SET_SHOP_LOCK" && action.locked,
		);
		if (!lockAction) {
			throw new Error("Expected an available shop lock action");
		}
		const locked = applyAction(purchased.state, lockAction);
		expect(locked.ok).toBe(true);
		let townState = locked.state;

		for (let attempt = 0; attempt < 2; attempt += 1) {
			const entered = applyAction(townState, { type: "ENTER_COMBAT" });
			const loaded = runStateSchema.parse(JSON.parse(JSON.stringify(entered.state)));
			const escaped = applyAction(addPlayerStatus(loaded, "invisible"), {
				type: "RETURN_TO_TOWN",
			});

			expect(escaped.ok).toBe(true);
			expect(escaped.state.town).toEqual(locked.state.town);
			expect(escaped.state.shopLocks).toEqual(locked.state.shopLocks);
			expect(applyAction(escaped.state, buyAction)).toMatchObject({
				ok: false,
				error: "SHOP_SLOT_ALREADY_PURCHASED",
			});
			townState = escaped.state;
		}

		const victory = applyAction(townState, { type: "ENTER_COMBAT" }).state;
		victory.combat!.status = "player_won";
		const nextTown = applyAction(victory, { type: "RETURN_TO_TOWN" });
		expect(nextTown.ok).toBe(true);
		expect(nextTown.state.battleNumber).toBe(townState.battleNumber + 1);
		expect(nextTown.state.town!.rerollCount).toBe(0);
		expect(nextTown.state.town!.shopSlots.every((slot) => !slot.purchased)).toBe(true);
		expect(nextTown.state.shopLocks).toEqual(locked.state.shopLocks);
	});

	it("creates a shop for the current battle when escaping after continuing directly", () => {
		const continued = applyAction(createTestVictoryState(), {
			type: "CONTINUE_TO_NEXT_COMBAT",
		});
		expect(continued.ok).toBe(true);
		expect(continued.state.town).toBeNull();
		const state = addPlayerStatus(continued.state, "invisible");

		const escaped = applyAction(state, { type: "RETURN_TO_TOWN" });

		expect(escaped.ok).toBe(true);
		expect(escaped.state.battleNumber).toBe(state.battleNumber);
		expect(escaped.state.town!.shopSlots.length).toBeGreaterThan(0);
		const retry = applyAction(escaped.state, { type: "ENTER_COMBAT" });
		const escapedAgain = applyAction(addPlayerStatus(retry.state, "invisible"), {
			type: "RETURN_TO_TOWN",
		});
		expect(escapedAgain.state.town).toEqual(escaped.state.town);
	});

	it("rejects escaping while stunned or after defeat, even when invisible", () => {
		const invisible = addPlayerStatus(createTestCombatState(), "invisible");
		const defeated = structuredClone(invisible);
		defeated.phase = "dead";
		defeated.combat!.status = "enemy_won";

		for (const state of [addPlayerStatus(invisible, "stunned"), defeated]) {
			expect(applyAction(state, { type: "RETURN_TO_TOWN" })).toMatchObject({
				ok: false,
				error: "INVALID_PHASE",
				state,
			});
		}
	});

	it("restores locked slots on a later town visit", () => {
		const firstTown = createTestCombatState();
		const firstVictory = {
			...firstTown,
			combat: firstTown.combat
				? { ...firstTown.combat, status: "player_won" as const }
				: null,
		};
		const enteredTown = applyAction(firstVictory, { type: "RETURN_TO_TOWN" });
		const shopSlotId = enteredTown.state.town!.shopSlots[0].id;
		const locked = applyAction(enteredTown.state, {
			type: "SET_SHOP_LOCK",
			shopSlotId,
			locked: true,
		});
		const lockedSlot = locked.state.shopLocks[0];
		const combat = applyAction(locked.state, { type: "ENTER_COMBAT" });
		const victory = {
			...combat.state,
			combat: combat.state.combat
				? { ...combat.state.combat, status: "player_won" as const }
				: null,
		};

		const returned = applyAction(victory, { type: "RETURN_TO_TOWN" });

		expect(returned.ok).toBe(true);
		expect(returned.state.town?.rerollCount).toBe(0);
		expect(returned.state.town?.shopSlots[0]).toEqual(lockedSlot);
		expect(returned.state.shopLocks).toEqual([lockedSlot]);
	});

	it("does not carry a speed potion's Haste into the next encounter", () => {
		const state = createTestVictoryState();
		state.combat = resolveConsumableEffects(
			state.combat!,
			CONSUMABLES_BY_ID.speedPotion,
			state.rngState,
		).value.combat;
		const transition = applyAction(state, { type: "RETURN_TO_TOWN" });
		expect(transition.ok).toBe(true);
		const next = applyAction(transition.state, { type: "ENTER_COMBAT" });
		expect(next.ok).toBe(true);
		expect(
			next.state.combat!.player.activeEffects.some(
				(effect) => effect.type === "status" && effect.statusId === "haste",
			),
		).toBe(false);
	});
});
