import { EquipmentSlot } from "@app/content";
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
	index: number,
): string {
	return `${combatId}:turn:${turnNumber}:effect:${index}`;
}
