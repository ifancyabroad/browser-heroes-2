import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rage",
	name: "Rage",
	description:
		"Tap into raw fury to amplify all damage and shrug off blows at the cost of defense.",
	icon: "skills/barbarian/rage.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 8 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -3,
			duration: { unit: "turns", value: 8 },
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.75,
			duration: { unit: "turns", value: 8 },
		},
	],
	tags: [],
});
