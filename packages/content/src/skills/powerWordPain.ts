import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_pain",
	name: "Power Word: Pain",
	description:
		"Speak a word of torment that inflicts intense necrotic damage, draining the life from your foe.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTYFhLYpX2p1ZbdUfj?alt=media&token=3afc9109-23d1-4f2e-9def-e492b0201f1e",
	pool: "occultist",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 3,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "2d12+15",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "3d12+21",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "4d12+27",
					attribute: "wisdom",
				},
			],
		},
	],
	tags: [],
});
