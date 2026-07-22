import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "molten_overdrive",
	name: "Molten Overdrive",
	icon: "skills/unique/molten_overdrive.png",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			operation: "add",
			value: 2,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			operation: "add",
			value: 5,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: 50,
			durationTurns: 6,
		},
	],
	tags: [],
});
