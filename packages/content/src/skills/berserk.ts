import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "berserk",
	name: "Berserk",
	description: "Increase your melee damage dealt at the cost of Armour Class.",
	icon: "skills/common/berserk.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			attackRange: "melee",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -4,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
