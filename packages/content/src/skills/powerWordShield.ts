import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_shield",
	name: "Power Word: Shield",
	description: "Gain a shield that absorbs incoming damage for the current battle.",
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
			amount: 20,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
