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
			stat: "attackRollBonus",
			value: 1,
			durationTurns: 5,
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "add",
			value: 1,
			durationTurns: 5,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 2,
			durationTurns: 5,
		},
	],
	tags: [],
});
