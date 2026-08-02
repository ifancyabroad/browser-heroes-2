import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_fortitude",
	name: "Power Word: Fortitude",
	description:
		"Speak a word of endurance that temporarily expands the body's capacity for punishment.",
	icon: "skills/common/power_word_fortitude.png",
	pool: "common",
	kind: "spell",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 15,
			durationTurns: 8,
		},
	],
	tags: [],
});
