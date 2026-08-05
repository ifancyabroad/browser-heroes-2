import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_shield",
	name: "Power Word: Shield",
	description:
		"Speak a word of warding that surrounds you with a protective barrier for the battle.",
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
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
