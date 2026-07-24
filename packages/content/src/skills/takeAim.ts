import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "take_aim",
	name: "Take Aim",
	icon: "skills/common/take_aim.png",
	pool: "common",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 4,
		},
	],
	tags: [],
});
