import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "growth",
	name: "Growth",
	icon: "skills/common/growth.png",
	pool: "common",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "strength",
			operation: "add",
			value: 2,
			durationTurns: 5,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "constitution",
			operation: "add",
			value: 2,
			durationTurns: 5,
		},
	],
	tags: [],
});
