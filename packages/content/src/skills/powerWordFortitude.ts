import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_fortitude",
	name: "Power Word: Fortitude",
	icon: "skills/common/power_word_fortitude.png",
	pool: "common",
	kind: "spell",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 10,
			durationTurns: 8,
		},
	],
	tags: [],
});
