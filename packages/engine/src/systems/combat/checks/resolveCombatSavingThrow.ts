import type { SavingThrow } from "@app/content";

import type { CombatantSide, CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { getCombatant } from "../combatants/combatantSelectors";
import { consumeCombatantRollModifierCharges } from "../effects/consumeRollModifierCharges";
import { resolveSavingThrow, type SavingThrowResult } from "./resolveSavingThrow";

type ResolveCombatSavingThrowInput = {
	combat: CombatState;
	attackerSide: CombatantSide;
	defenderSide: CombatantSide;
	save: SavingThrow;
	rngState: RngState;
};

export type CombatSavingThrowResult = SavingThrowResult & { combat: CombatState };

export function resolveCombatSavingThrow(
	input: ResolveCombatSavingThrowInput,
): RngResult<CombatSavingThrowResult> {
	const result = resolveSavingThrow({
		rngState: input.rngState,
		attacker: getCombatant(input.combat, input.attackerSide),
		defender: getCombatant(input.combat, input.defenderSide),
		save: input.save,
	});

	return {
		value: {
			...result.value,
			combat: consumeCombatantRollModifierCharges(
				input.combat,
				input.defenderSide,
				result.value.consumedEffectIds,
			),
		},
		rngState: result.rngState,
	};
}
