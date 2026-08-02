import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reposition",
	name: "Reposition",
	icon: "skills/common/reposition.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});
