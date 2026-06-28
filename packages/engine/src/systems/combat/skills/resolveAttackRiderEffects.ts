import type { CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import type { SupportedRiderEffect } from "./validatePlayerSkillUse";

import { resolveDamageEffect } from "./effects/resolveDamageEffect";
import { resolveHealEffect } from "./effects/resolveHealEffect";
import type { SavingThrow } from "@app/content";
import { getCombatant, getOpponent } from "../combatants/combatantSelectors";
import { resolveSavingThrow } from "../checks/resolveSavingThrow";
import { appendCombatLog } from "../logs/appendCombatLog";

type ResolveAttackRiderEffectsInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effects: SupportedRiderEffect[];
	save?: SavingThrow;
	skillName: string;
	rngState: RngState;
};

export function resolveAttackRiderEffects(
	input: ResolveAttackRiderEffectsInput,
): RngResult<CombatState> {
	let combat = input.combat;
	let rngState = input.rngState;

	if (input.save) {
		const actor = getCombatant(combat, input.actorSide);

		const target = getOpponent(combat, input.actorSide);

		const savingThrow = resolveSavingThrow({
			rngState,
			attacker: actor,
			defender: target,
			save: input.save,
		});

		rngState = savingThrow.rngState;

		if (savingThrow.value.success) {
			return {
				value: appendCombatLog(combat, {
					turnNumber: combat.turnNumber,
					actor: target.side,
					message:
						`${target.name} resists the additional effects ` + `of ${input.skillName}.`,
					eventType: "skill_used",
				}),
				rngState,
			};
		}
	}

	for (const effect of input.effects) {
		switch (effect.type) {
			case "damage": {
				const result = resolveDamageEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					skillName: input.skillName,
					logContext: "rider",
					rngState,
				});

				combat = result.value;
				rngState = result.rngState;
				break;
			}

			case "heal": {
				const result = resolveHealEffect({
					combat,
					actorSide: input.actorSide,
					effect,
					skillName: input.skillName,
					logContext: "rider",
					rngState,
				});

				combat = result.value;
				rngState = result.rngState;
				break;
			}
		}
	}

	return {
		value: combat,
		rngState,
	};
}
