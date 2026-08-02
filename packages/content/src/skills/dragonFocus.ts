import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_focus",
	name: "Dragon Focus",
	icon: "skills/common/dragon_focus.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 6,
		},
	],
	tags: [],
});
