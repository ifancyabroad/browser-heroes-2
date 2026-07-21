import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_screech",
	name: "Deafening Screech",
	icon: "skills/common/deafening_screech.png",
	pool: "common",
	category: "debuff",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
