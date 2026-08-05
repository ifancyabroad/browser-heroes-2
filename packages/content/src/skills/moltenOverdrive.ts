import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "molten_overdrive",
	name: "Molten Overdrive",
	description:
		"Drive the molten core beyond its limits, gaining brutal precision and power while shedding armour.",
	icon: "skills/unique/molten_overdrive.png",
	pool: "unique",
	kind: "technique",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 5,
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -3,
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
