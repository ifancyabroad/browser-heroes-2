import type { CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import type { ActionResolution } from "../logs/actionOutcome";
import { getCombatant } from "../combatants/combatantSelectors";
import { collectFeatAttackRiders } from "./collectFeatAttackRiders";
import { resolveAttackRiders } from "./resolveAttackRiders";

type ResolveFeatAttackRidersInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	critical: boolean;
	rngState: RngState;
};

export function resolveFeatAttackRiders(
	input: ResolveFeatAttackRidersInput,
): RngResult<ActionResolution> {
	const actor = getCombatant(input.combat, input.actorSide);
	const featAttackRiders = collectFeatAttackRiders(actor.featIds);
	let combat = input.combat;
	let rngState = input.rngState;
	const outcomes: ActionResolution["outcomes"] = [];

	for (const { featId, featName, riderIndex, rider } of featAttackRiders) {
		const shouldResolve =
			rider.timing === "onHit" || (rider.timing === "onCrit" && input.critical);

		if (!shouldResolve) {
			continue;
		}

		const riderResult = resolveAttackRiders({
			combat,
			actorSide: input.actorSide,
			effects: rider.effects,
			save: rider.save,
			sourceContext: {
				source: {
					type: "feat",
					featId,
					sourceName: featName,
				},
				sourceEffectKeyPrefix: `feat:${featId}:rider:${riderIndex}`,
			},
			rngState,
		});

		combat = riderResult.value.combat;
		outcomes.push(...riderResult.value.outcomes);
		rngState = riderResult.rngState;
	}

	return {
		value: { combat, outcomes },
		rngState,
	};
}
