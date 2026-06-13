export function createCombatId(runId: string, battleNumber: number): string {
	return `${runId}:combat:${battleNumber}`;
}

export function createCombatLogId(combatId: string, index: number): string {
	return `${combatId}:log:${index}`;
}

export function createRunLogId(runId: string, index: number): string {
	return `${runId}:log:${index}`;
}

export function createItemInstanceId(runId: string, index: number): string {
	return `${runId}:item:${index}`;
}

export function createEffectInstanceId(combatId: string, index: number): string {
	return `${combatId}:effect:${index}`;
}

export function createCombatantId(combatId: string, side: "player" | "enemy"): string {
	return `${combatId}:combatant:${side}`;
}

export function createEnemyInstanceId(combatId: string): string {
	return `${combatId}:enemy`;
}

export function createStartingItemInstanceId(runId: string, slot: string): string {
	return `${runId}:item:starting:${slot}`;
}

export function createSkillInstanceId(combatantId: string, skillId: string): string {
	return `${combatantId}:skill:${skillId}`;
}
