import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_upon_rit_chi",
	name: "Call Upon Rit Chi",
	icon: "skills/unique/call_upon_rit_chi.png",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "strength",
			operation: "add",
			value: 4,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "dexterity",
			operation: "add",
			value: 4,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "constitution",
			operation: "add",
			value: 4,
			durationTurns: 6,
		},
	],
	tags: [],
});
