import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "horrifying_visage",
	name: "Horrifying Visage",
	description:
		"Give the enemy disadvantage on attack rolls and reduce their damage dealt, each requiring a separate failed Wisdom saving throw.",
	icon: "skills/common/horrifying_visage.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma", bonus: 6 },
			},
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma", bonus: 6 },
			},
		},
	],
	tags: [],
});
