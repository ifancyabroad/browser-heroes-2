import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acquire_target",
	name: "Acquire Target",
	icon: "skills/unique/acquire_target.png",
	pool: "unique",
	kind: "technique",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});
