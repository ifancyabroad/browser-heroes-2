import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "web",
	name: "Web",
	icon: "skills/common/web.png",
	pool: "common",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
