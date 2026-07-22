import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "creeping_darkness",
	name: "Creeping Darkness",
	icon: "skills/common/creeping_darkness.png",
	pool: "common",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			operation: "add",
			value: -2,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "criticalRangeBonus",
			operation: "add",
			value: -5,
			durationTurns: 4,
		},
	],
	tags: [],
});
