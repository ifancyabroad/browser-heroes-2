import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reposition",
	name: "Reposition",
	description: "Move to protected ground and become considerably harder to strike.",
	icon: "skills/common/reposition.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 4,
			durationTurns: 4,
		},
	],
	tags: [],
});
