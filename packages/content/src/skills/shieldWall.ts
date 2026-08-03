import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_wall",
	name: "Shield Wall",
	description:
		"Lock into a shield wall that provides formidable protection against incoming attacks.",
	icon: "skills/common/shield_wall.png",
	pool: "common",
	kind: "technique",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 6,
			durationTurns: 4,
		},
	],
	tags: [],
});
