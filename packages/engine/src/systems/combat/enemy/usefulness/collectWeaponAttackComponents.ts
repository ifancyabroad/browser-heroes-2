import type {
	AttackDamageEffect,
	AttackRider,
	DamageType,
	FeatId,
	RiderEffect,
	SkillId,
} from "@app/content";
import type { CombatantBasicAttack, CombatantState } from "../../../../schemas";
import { collectFeatAttackRiders } from "../../attacks/collectFeatAttackRiders";

export type EnemyEffectSource =
	| { type: "skill"; skillId: SkillId }
	| { type: "basicAttack"; sourceDefinitionId: string }
	| { type: "feat"; featId: FeatId };

type WeaponAttackComponents = {
	damageTypes: DamageType[];
	riderEffects: {
		effect: RiderEffect;
		source: EnemyEffectSource;
		sourceEffectKey: string;
	}[];
};

type WeaponSkillEffect = {
	effect: AttackDamageEffect;
	source: EnemyEffectSource;
	sourceEffectKey: string;
};

export function collectWeaponAttackComponents(
	enemy: CombatantState,
	skill?: WeaponSkillEffect,
): WeaponAttackComponents {
	const damageTypes: DamageType[] = [
		skill?.effect.damageTypeOverride ?? enemy.basicAttack.damage.type,
	];
	if (enemy.offHandBasicAttack) {
		damageTypes.push(enemy.offHandBasicAttack.damage.type);
	}
	if (skill?.effect.extraDamageType) {
		damageTypes.push(skill.effect.extraDamageType);
	}

	const attackRiders = getWeaponAttacks(enemy).flatMap(({ attack, sourceKey }) =>
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

	const skillRiders: ResolvedRider[] = skill
		? skill.effect.attackRiders.map((rider, riderIndex) => ({
				rider,
				source: skill.source,
				sourceEffectKeyPrefix: `${skill.sourceEffectKey}:rider:${riderIndex}`,
			}))
		: [];

	return {
		damageTypes,
		riderEffects: [...attackRiders, ...featRiders, ...skillRiders].flatMap(
			({ rider, source, sourceEffectKeyPrefix }) =>
				rider.effects.map((effect, effectIndex) => ({
					effect,
					source,
					sourceEffectKey: `${sourceEffectKeyPrefix}:effect:${effectIndex}`,
				})),
		),
	};
}

type WeaponAttackEntry = {
	attack: CombatantBasicAttack;
	sourceKey: "mainHand" | "offHand";
};

function getWeaponAttacks(enemy: CombatantState): WeaponAttackEntry[] {
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
