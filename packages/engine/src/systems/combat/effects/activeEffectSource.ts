import { type SkillId } from "@app/content";

import type { ActiveCombatEffect } from "../../../schemas";

export function isSameActiveEffectSource(a: ActiveCombatEffect, b: ActiveCombatEffect): boolean {
	return (
		a.sourceCombatantId === b.sourceCombatantId &&
		a.source.type === b.source.type &&
		a.source.sourceEffectKey === b.source.sourceEffectKey
	);
}

export function isActiveEffectFromSkill(
	effect: ActiveCombatEffect,
	sourceCombatantId: string,
	skillId: SkillId,
): boolean {
	return (
		effect.sourceCombatantId === sourceCombatantId &&
		effect.source.type === "skill" &&
		effect.source.skillId === skillId
	);
}
