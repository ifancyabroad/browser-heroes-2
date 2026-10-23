import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_cloud",
	name: "Poison Cloud",
	description:
		"Deal poison damage to the enemy. A failed Constitution saving throw also causes poison damage over time.",
	icon: "skills/common/poison_cloud.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			damageClass: "magical",
			dice: "4d6",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "dexterity",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			damageClass: "magical",
			dice: "2d4",
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
