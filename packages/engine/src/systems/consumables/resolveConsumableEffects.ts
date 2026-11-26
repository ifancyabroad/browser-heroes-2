import type { Consumable, ConsumableEffect } from "@app/content";
import type { ActiveEffectSource, CombatState } from "../../schemas";
import type { RngResult, RngState } from "../../core/rng";
import type { ActionResolution } from "../combat/logs/actionOutcome";
import { resolveHealEffect } from "../combat/effects/resolvers/resolveHealEffect";
import { resolveDamageEffect } from "../combat/effects/resolvers/resolveDamageEffect";
import { applyStatusEffect } from "../combat/effects/resolvers/applyStatusEffect";
import { applyRecurringEffect } from "../combat/effects/resolvers/applyRecurringEffect";
import { applyTemporaryModifierEffect } from "../combat/effects/resolvers/applyTemporaryModifierEffect";

export function resolveConsumableEffects(
	combat: CombatState,
	consumable: Consumable,
	rngState: RngState,
): RngResult<ActionResolution> {
	let currentCombat = combat;
	let currentRngState = rngState;
	const outcomes: ActionResolution["outcomes"] = [];

	for (let effectIndex = 0; effectIndex < consumable.effects.length; effectIndex += 1) {
		const result = resolveConsumableEffect(
			currentCombat,
			consumable.effects[effectIndex],
			{
				type: "consumable",
				consumableId: consumable.id,
				sourceName: consumable.name,
				sourceEffectKey: `effect:${effectIndex}`,
			},
			currentRngState,
		);
		currentCombat = result.value.combat;
		currentRngState = result.rngState;
		outcomes.push(...result.value.outcomes);
	}

	return { value: { combat: currentCombat, outcomes }, rngState: currentRngState };
}

function resolveConsumableEffect(
	combat: CombatState,
	effect: ConsumableEffect,
	source: ActiveEffectSource,
	rngState: RngState,
): RngResult<ActionResolution> {
	const input = { combat, actorSide: "player" as const, rngState };
	switch (effect.type) {
		case "heal":
			return resolveHealEffect({ ...input, effect });
		case "damage":
			return resolveDamageEffect({ ...input, effect });
		case "applyStatus":
			return applyStatusEffect({ ...input, effect, source });
		case "modifyStat":
		case "modifyHealing":
		case "modifyDamage":
		case "modifyDamageTaken":
		case "modifyDamageAffinity":
		case "modifyRoll":
			return applyTemporaryModifierEffect({ ...input, effect, source });
		case "damageOverTime":
		case "healOverTime":
		case "shield":
			return applyRecurringEffect({ ...input, effect, source });
	}
}
