import type { CombatantState } from "../../../schemas";
import { replaceCombatantActiveEffects } from "./replaceCombatantActiveEffects";

export function carryBattleEffects(
	previousPlayer: CombatantState,
	nextPlayer: CombatantState,
): CombatantState {
	const activeEffects = previousPlayer.activeEffects.flatMap((effect) => {
		if (effect.duration.unit !== "battles") {
			return [];
		}

		const remaining = effect.duration.remaining - 1;
		if (remaining <= 0) {
			return [];
		}

		return [
			{
				...effect,
				sourceCombatantId:
					effect.sourceSide === "player" ? nextPlayer.id : effect.sourceCombatantId,
				duration: { unit: "battles" as const, remaining },
			},
		];
	});

	return replaceCombatantActiveEffects(nextPlayer, activeEffects);
}
