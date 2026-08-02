import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_focus",
	name: "Dragon Focus",
	description:
		"Gather draconic power, making breath and supernatural abilities harder to resist.",
	icon: "skills/common/dragon_focus.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "saveDcBonus",
			value: 3,
			durationTurns: 6,
		},
	],
	tags: [],
});
