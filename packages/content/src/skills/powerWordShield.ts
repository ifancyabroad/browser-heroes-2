import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_shield",
	name: "Power Word: Shield",
	description:
		"Enchant yourself with a powerful shield, significantly increasing your armor class.",
	icon: "skills/occultist/power_word_shield.png",
	pool: "occultist",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 4,
			durationTurns: 8,
		},
	],
	tags: [],
});
