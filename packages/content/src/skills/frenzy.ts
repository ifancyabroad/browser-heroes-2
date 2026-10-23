import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frenzy",
	name: "Frenzy",
	description:
		"Gain advantage on attack rolls and increase your melee damage dealt at the cost of Armour Class.",
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
