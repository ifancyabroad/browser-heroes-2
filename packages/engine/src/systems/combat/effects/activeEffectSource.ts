import type { ActiveCombatEffect } from "../../../schemas";

export function isSameActiveEffectSource(a: ActiveCombatEffect, b: ActiveCombatEffect): boolean {
	if (
		a.sourceSide !== b.sourceSide ||
		a.source.type !== b.source.type ||
		a.source.sourceEffectKey !== b.source.sourceEffectKey
	) {
		return false;
	}

	switch (a.source.type) {
		case "skill":
			return b.source.type === "skill" && a.source.skillId === b.source.skillId;
		case "feat":
			return b.source.type === "feat" && a.source.featId === b.source.featId;
		case "basicAttack":
			return b.source.type === "basicAttack" && a.source.sourceName === b.source.sourceName;
	}
}
