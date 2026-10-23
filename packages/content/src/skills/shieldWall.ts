import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_wall",
	name: "Shield Wall",
	description: "Increase your Armour Class.",
	icon: "skills/common/shield_wall.png",
	pool: "common",
	kind: "technique",
	category: "defensive",
	rarity: "common",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 4,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
