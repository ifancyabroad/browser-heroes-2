import type { Consumable } from "@app/content";
import type { CombatState } from "../../schemas";
import type { RngResult, RngState } from "../../core/rng";
import type { ActionResolution } from "../combat/logs/actionOutcome";
import { resolveConsumableHealPercentEffect } from "./effects/resolveConsumableHealPercentEffect";
import { resolveConsumableDamageEffect } from "./effects/resolveConsumableDamageEffect";
import { resolveConsumableStatusEffect } from "./effects/resolveConsumableStatusEffect";

export function resolveConsumableEffect(
	combat: CombatState,
	consumable: Consumable,
	rngState: RngState,
): RngResult<ActionResolution> {
	switch (consumable.effect.type) {
		case "healPercent":
			return resolveConsumableHealPercentEffect(combat, consumable.effect, rngState);
		case "damage":
			return resolveConsumableDamageEffect(combat, consumable.effect, rngState);
		case "applyStatus":
			return resolveConsumableStatusEffect(
				combat,
				consumable.effect,
				consumable.id,
				rngState,
			);
	}
}
