import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overpower",
	name: "Overpower",
	description:
		"Drive through the enemy's guard with a brutal blow that may leave their armour exposed.",
	icon: "skills/common/overpower.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "4d8",
			attribute: "strength",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
