import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rage",
	name: "Rage",
	description:
		"Tap into raw fury to amplify physical damage and shrug off blows at the cost of defense.",
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
			damageClass: "physical",
			operation: "multiply",
			value: 2,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -4,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.75,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
