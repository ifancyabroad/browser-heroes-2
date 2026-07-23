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
			stat: "attackRollBonus",
			operation: "add",
			value: -2,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "add",
			value: -2,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "saveDcBonus",
			operation: "add",
			value: -2,
			durationTurns: 4,
		},
	],
	tags: [],
});
