import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "horrifying_visage",
	name: "Horrifying Visage",
	icon: "skills/common/horrifying_visage.png",
	pool: "common",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "strength",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "dexterity",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "constitution",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "intelligence",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
