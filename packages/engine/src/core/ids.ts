import type { EquipmentSlot } from "@app/content";
import type { CombatantSide } from "../schemas";

export function createCombatId(runId: string, battleNumber: number): string {
	return `${runId}:combat:${battleNumber}`;
}

export function createCombatantId(combatId: string, side: CombatantSide): string {
	return `${combatId}:combatant:${side}`;
}

export function createCombatLogId(combatId: string, index: number): string {
	return `${combatId}:log:${index}`;
}

export function createRunLogId(runId: string, index: number): string {
	return `${runId}:log:${index}`;
}

export function createStartingItemInstanceId(runId: string, slot: EquipmentSlot): string {
	return `${runId}:item:starting:${slot}`;
}

export function createEffectInstanceId(
	combatId: string,
	turnNumber: number,
	sourceCombatantId: string,
	sourceEffectKey: string,
): string {
	return `${combatId}:turn:${turnNumber}:source:${sourceCombatantId}:effect:${sourceEffectKey}`;
}

export function createRewardItemInstanceId(
	runId: string,
	battleNumber: number,
	itemId: string,
): string {
	return `${runId}:item:reward:${battleNumber}:${itemId}`;
}

export function createTownShopSlotId(runId: string, index: number): string {
	return `${runId}:town:shop:${index}`;
}

export function createShopItemInstanceId(
	runId: string,
	shopSlotId: string,
	itemId: string,
): string {
	return `${runId}:item:shop:${shopSlotId}:${itemId}`;
}
