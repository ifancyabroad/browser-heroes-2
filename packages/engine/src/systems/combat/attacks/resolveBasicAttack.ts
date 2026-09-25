import type { CombatantSide, CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import { getCombatant, getOpponent } from "../combatants/combatantSelectors";
import { formatBasicAttackHeading } from "../logs/formatActionLog";
import { appendActionLog } from "../logs/appendActionLog";
import { resolveWeaponAttack } from "./resolveWeaponAttack";

type ResolveBasicAttackInput = {
	combat: CombatState;
	attackerSide: CombatantSide;
	rngState: RngState;
};

export function resolveBasicAttack(input: ResolveBasicAttackInput): RngResult<CombatState> {
	const attacker = getCombatant(input.combat, input.attackerSide);
	const defender = getOpponent(input.combat, input.attackerSide);
	const result = resolveWeaponAttack({
		combat: input.combat,
		actorSide: input.attackerSide,
		rngState: input.rngState,
	});
	return {
		value: appendActionLog({
			combat: result.value.combat,
			actor: attacker.side,
			heading: formatBasicAttackHeading(attacker.name, defender.name),
			eventType: "basic_attack",
			outcomes: result.value.outcomes,
		}),
		rngState: result.rngState,
	};
}
