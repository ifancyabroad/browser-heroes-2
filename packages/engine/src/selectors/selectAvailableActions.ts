import type { EngineAction, PlayerUseSkillAction, RunState } from "../schemas";
import { hasActiveStatus } from "../systems/combat/effects/statuses/hasActiveStatus";
import { canTargetCombatant } from "../systems/combat/combatants/canTargetCombatant";
import { validateCombatantSkillUse } from "../systems/combat/skills/validateCombatantSkillUse";
import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";
import { consumables } from "@app/content";
import { validateConsumableUse } from "../systems/consumables/validateConsumableUse";
import { isFinalBossVictory } from "../systems/endless/endlessProgression";
import { canSwapHandWeapons } from "../systems/equipment/canSwapHandWeapons";
import { getItemInstanceDefinition } from "../systems/items/getItemInstanceDefinition";
import { deriveHeroStats } from "../systems/hero/deriveHeroStats";
import { isHeroFullyRested } from "../systems/hero/isHeroFullyRested";
import { canRerollLevelUp } from "../systems/progression/levelUp/selectLevelUpOptions";
import {
	calculateConsumableCost,
	calculateRerollCost,
	calculateRestCost,
	calculateTownItemPrice,
} from "../systems/town/townPricing";

export function selectAvailableActions(state: RunState): EngineAction[] {
	if (state.hero.pendingLevelUp) {
		return getLevelUpActions(state);
	}

	if (state.pendingRewardChoice) {
		return getRewardActions(state);
	}

	if (state.phase === "town") {
		return getTownActions(state);
	}

	if (state.phase === "combat" && state.combat?.status === "active") {
		const player = state.combat.player;

		if (hasActiveStatus(player, "stunned")) {
			return [
				{
					type: "PLAYER_SKIP_TURN",
				},
			];
		}

		const actions: EngineAction[] = [];
		if (canTargetCombatant(player, state.combat.enemy)) {
			actions.push({ type: "PLAYER_BASIC_ATTACK" });
		}

		if (!hasActiveStatus(player, "silenced")) {
			actions.push(...getSkillActions(state));
		}

		for (const definition of consumables) {
			if (validateConsumableUse(state.hero, definition.id, state.combat).ok) {
				actions.push({ type: "PLAYER_USE_CONSUMABLE", consumableType: definition.id });
			}
		}

		actions.push({
			type: "PLAYER_SKIP_TURN",
		});

		if (hasActiveStatus(player, "invisible")) {
			actions.push({ type: "RETURN_TO_TOWN" });
		}

		return actions;
	}

	if (
		state.phase === "combat" &&
		state.combat?.status === "player_won" &&
		isFinalBossVictory(state.battleNumber)
	) {
		return [
			{
				type: "CONTINUE_TO_NEXT_COMBAT",
			},
			{
				type: "RETURN_TO_TOWN",
			},
			{
				type: "RETIRE_RUN",
			},
		];
	}

	if (state.phase === "combat" && state.combat?.status === "player_won") {
		return [
			{
				type: "CONTINUE_TO_NEXT_COMBAT",
			},
			{
				type: "RETURN_TO_TOWN",
			},
		];
	}

	return [];
}

function getLevelUpActions(state: RunState): EngineAction[] {
	const pendingLevelUp = state.hero.pendingLevelUp;

	if (!pendingLevelUp) {
		return [];
	}

	if (pendingLevelUp.options.length === 0) {
		return [
			{
				type: "COMPLETE_LEVEL_UP",
				selection: null,
			},
		];
	}

	const actions: EngineAction[] = pendingLevelUp.options.map((option) => {
		if (option.type === "skill") {
			return {
				type: "COMPLETE_LEVEL_UP",
				selection: {
					type: "skill",
					skillId: option.skillId,
				},
			};
		}

		return {
			type: "COMPLETE_LEVEL_UP",
			selection: {
				type: "feat",
				featId: option.featId,
			},
		};
	});

	if (state.levelUpRerolls > 0 && canRerollLevelUp(state.hero, pendingLevelUp)) {
		actions.push({ type: "REROLL_LEVEL_UP" });
	}

	return actions;
}

function getRewardActions(state: RunState): EngineAction[] {
	const pendingRewardChoice = state.pendingRewardChoice;

	if (!pendingRewardChoice) {
		return [];
	}

	return pendingRewardChoice.options.flatMap((option, optionIndex): EngineAction[] => {
		if (option.type === "gold") {
			return [
				{
					type: "SELECT_REWARD",
					selection: {
						optionIndex,
					},
				},
			];
		}

		return [];
	});
}

function getTownActions(state: RunState): EngineAction[] {
	if (!state.town) {
		return [];
	}

	const derivedHeroStats = deriveHeroStats(state.hero);
	const effectiveCharisma = derivedHeroStats.effectiveAttributes.charisma;

	const rerollCost = calculateRerollCost(
		effectiveCharisma,
		state.town.shopLevel,
		state.town.rerollCount,
	);

	const restCost = calculateRestCost(effectiveCharisma, state.day);

	const actions: EngineAction[] = [
		{
			type: "ENTER_COMBAT",
		},
	];

	if (state.gold >= rerollCost) {
		actions.push({
			type: "REROLL_SHOP",
		});
	}

	if (state.gold >= restCost && !isHeroFullyRested(state.hero, derivedHeroStats.health.maxHp)) {
		actions.push({
			type: "REST_AT_TOWN",
		});
	}

	for (const definition of consumables) {
		const price = calculateConsumableCost(definition.id, effectiveCharisma, state.zoneNumber);
		if (state.hero.consumables[definition.id] < definition.maxCarry && state.gold >= price) {
			actions.push({ type: "BUY_CONSUMABLE", consumableType: definition.id, quantity: 1 });
		}
	}

	if (canSwapHandWeapons(state)) {
		actions.push({
			type: "SWAP_HAND_WEAPONS",
		});
	}

	actions.push(...getBuyItemActions(state, effectiveCharisma));
	actions.push(...getShopLockActions(state));

	return actions;
}

function getShopLockActions(state: RunState): EngineAction[] {
	if (!state.town) {
		return [];
	}

	return state.town.shopSlots.flatMap((slot): EngineAction[] => {
		if (slot.purchased) {
			return [];
		}

		return [
			{
				type: "SET_SHOP_LOCK",
				shopSlotId: slot.id,
				locked: !state.shopLocks.some((lock) => lock.id === slot.id),
			},
		];
	});
}

function getBuyItemActions(state: RunState, effectiveCharisma: number): EngineAction[] {
	if (!state.town) {
		return [];
	}

	return state.town.shopSlots.flatMap((slot): EngineAction[] => {
		if (slot.purchased) {
			return [];
		}

		const item = getItemInstanceDefinition(slot.item);
		const price = calculateTownItemPrice(slot.price, effectiveCharisma);

		if (state.gold < price) {
			return [];
		}

		const validEquipmentSlots = getValidEquipmentSlots(item);

		if (validEquipmentSlots.length === 1) {
			return [
				{
					type: "BUY_ITEM",
					shopSlotId: slot.id,
				},
			];
		}

		return validEquipmentSlots.map((equipmentSlot) => ({
			type: "BUY_ITEM",
			shopSlotId: slot.id,
			equipmentSlot,
		}));
	});
}

function getSkillActions(state: RunState): PlayerUseSkillAction[] {
	if (!state.combat) {
		return [];
	}

	const { player, enemy } = state.combat;
	return player.skills
		.filter((skill) => validateCombatantSkillUse(player, skill.skillId, enemy).ok)
		.map((skill) => ({
			type: "PLAYER_USE_SKILL",
			skillId: skill.skillId,
		}));
}
