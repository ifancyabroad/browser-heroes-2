import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "intimidating_shout",
	name: "Intimidating Shout",
	description:
		"Give the enemy disadvantage on attack rolls. A failed Wisdom saving throw also reduces their physical damage dealt.",
	icon: "skills/barbarian/intimidating_shout.png",
	pool: "barbarian",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 2 },
		},
		{
			type: "modifyDamage",
			target: "enemy",
			damageClass: "physical",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
