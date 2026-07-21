import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frenzy",
	name: "Frenzy",
	icon: "skills/common/frenzy.png",
	pool: "common",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
			durationTurns: 4,
		},
	],
	tags: [],
});
