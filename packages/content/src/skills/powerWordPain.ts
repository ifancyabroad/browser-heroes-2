import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Speak a word of torment that inflicts intense necrotic damage, draining the life from your foe.",
	effects: [
		{
			damageType: "necrotic",
			max: 40,
			min: 16,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTYFhLYpX2p1ZbdUfj?alt=media&token=3afc9109-23d1-4f2e-9def-e492b0201f1e",
	level: 4,
	maxUses: 3,
	name: "Power Word: Pain",
	price: 0,
	id: "power_word_pain",
});
