import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frenzy",
	name: "Frenzy",
	description:
		"Enter a reckless frenzy that increases attack accuracy and melee damage at the cost of defence.",
	icon: "skills/common/frenzy.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyDamage",
			target: "self",
			attackRange: "melee",
			operation: "multiply",
			value: 1.25,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -2,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
