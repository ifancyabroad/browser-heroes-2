import type { AttackRider } from "@app/content";

import type { CombatantBasicAttack, CombatantState } from "../../../../schemas";

import { collectFeatAttackRiders } from "../../attacks/collectFeatAttackRiders";
import { getDamageAffinity } from "../../damage/damageAffinity";
import { isEnemyEffectUseful, type EnemyEffectSource } from "./isEnemyEffectUseful";

export function isEnemyBasicAttackUseful(enemy: CombatantState, player: CombatantState): boolean {
	const attacks = getBasicAttacks(enemy);
	const attackRiders = attacks.flatMap(({ attack, sourceKey }) =>
		attack.attackRiders.map(
			(rider, riderIndex): ResolvedRider => ({
				rider,
				source: {
					type: "basicAttack",
					sourceDefinitionId: `${enemy.sourceId}:${sourceKey}`,
				},
				sourceEffectKeyPrefix: `basicAttack:${sourceKey}:rider:${riderIndex}`,
			}),
		),
	);
	const featRiders = collectFeatAttackRiders(enemy.featIds).map(
		({ featId, riderIndex, rider }): ResolvedRider => ({
			rider,
			source: { type: "feat", featId },
			sourceEffectKeyPrefix: `feat:${featId}:rider:${riderIndex}`,
		}),
	);

	return (
		attacks.some(({ attack }) => getDamageAffinity(player, attack.damage.type) !== "immune") ||
		[...attackRiders, ...featRiders].some(({ rider, source, sourceEffectKeyPrefix }) =>
			rider.effects.some((effect, effectIndex) =>
				isEnemyEffectUseful({
					effect,
					source,
					sourceEffectKey: `${sourceEffectKeyPrefix}:effect:${effectIndex}`,
					enemy,
					player,
				}),
			),
		)
	);
}

type BasicAttackEntry = {
	attack: CombatantBasicAttack;
	sourceKey: "mainHand" | "offHand";
};

function getBasicAttacks(enemy: CombatantState): BasicAttackEntry[] {
	return [
		{ attack: enemy.basicAttack, sourceKey: "mainHand" },
		...(enemy.offHandBasicAttack
			? [{ attack: enemy.offHandBasicAttack, sourceKey: "offHand" as const }]
			: []),
	];
}

type ResolvedRider = {
	rider: AttackRider;
	source: EnemyEffectSource;
	sourceEffectKeyPrefix: string;
};
