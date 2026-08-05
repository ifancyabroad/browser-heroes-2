import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_shield",
	name: "Power Word: Shield",
	description:
		"Speak a word of warding that surrounds you with a powerful but temporary barrier.",
	icon: "skills/occultist/power_word_shield.png",
	pool: "occultist",
	kind: "spell",
	category: "defensive",
	rarity: "common",
	maxUses: 2,
	effects: [
		{
			type: "shield",
			target: "self",
			amount: 40,
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
