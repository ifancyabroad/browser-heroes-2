import {
	CONSUMABLES_BY_ID,
	type ConsumableApplyStatusEffect,
	type ConsumableId,
} from "@app/content";
import type { CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import type { ActionResolution } from "../../combat/logs/actionOutcome";
import { applyStatusEffect } from "../../combat/effects/resolvers/applyStatusEffect";

export function resolveConsumableStatusEffect(
	combat: CombatState,
	effect: ConsumableApplyStatusEffect,
	consumableId: ConsumableId,
	rngState: RngState,
): RngResult<ActionResolution> {
	return applyStatusEffect({
		combat,
		actorSide: "player",
		effect,
		source: {
			type: "consumable",
			consumableId,
			sourceName: CONSUMABLES_BY_ID[consumableId].name,
			sourceEffectKey: "effect:0",
		},
		rngState,
	});
}
