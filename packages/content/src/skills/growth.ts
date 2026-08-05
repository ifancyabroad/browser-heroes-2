import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "growth",
	name: "Growth",
	description: "Swell to unnatural size, gaining vitality and striking with greater force.",
	icon: "skills/common/growth.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 1.25,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 15,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
