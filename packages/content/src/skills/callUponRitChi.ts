import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_upon_rit_chi",
	name: "Call Upon Rit Chi",
	icon: "skills/unique/call_upon_rit_chi.png",
	pool: "unique",
	kind: "prayer",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "add",
			value: 2,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 4,
			durationTurns: 6,
		},
	],
	tags: [],
});
