import type { ConsumableActFirstEffect } from "@app/content";
import type { ActiveActFirstEffect, ActiveEffectSource, CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import { createEffectInstanceId } from "../../../core/ids";
import { replaceCombatant } from "../../combat/combatants/combatantSelectors";
import { isSameActiveEffectSource } from "../../combat/effects/activeEffectSource";
import { createActiveEffectDuration } from "../../combat/effects/createActiveEffectDuration";
import { upsertActiveCombatEffect } from "../../combat/effects/upsertActiveCombatEffect";
import type { ActionResolution } from "../../combat/logs/actionOutcome";

export function resolveConsumableActFirstEffect(
	combat: CombatState,
	effect: ConsumableActFirstEffect,
	source: Extract<ActiveEffectSource, { type: "consumable" }>,
	rngState: RngState,
): RngResult<ActionResolution> {
	const player = combat.player;
	const activeEffect: ActiveActFirstEffect = {
		id: createEffectInstanceId(combat.id, combat.turnNumber, player.id, source.sourceEffectKey),
		type: "actFirst",
		sourceCombatantId: player.id,
		sourceSide: "player",
		source,
		duration: createActiveEffectDuration(effect.duration),
	};
	const refreshed = player.activeEffects.some((existing) =>
		isSameActiveEffectSource(existing, activeEffect),
	);

	return {
		value: {
			combat: replaceCombatant(combat, upsertActiveCombatEffect(player, activeEffect)),
			outcomes: [{ type: "actFirst", targetName: player.name, effect, refreshed }],
		},
		rngState,
	};
}
