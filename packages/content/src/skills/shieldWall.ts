import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_wall",
	name: "Shield Wall",
	description:
		"Stand resolute with Shield Wall, shielding yourself from harm and repelling enemy assaults with unwavering defense.",
	icon: "skills/common/shield_wall.png",
	pool: "common",
	category: "buff",
	maxUses: 5,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			operation: "add",
			value: 3,
			durationTurns: 6,
		},
	],
	tags: [],
});
