import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "toxic_spit",
	name: "Toxic Spit",
	description:
		"Deal poison damage to the enemy. A failed Constitution saving throw also causes poison damage over time.",
	icon: "skills/common/toxic_spit.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			damageClass: "other",
			attackRange: "ranged",
			dice: "4d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			damageClass: "other",
			dice: "2d4",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
