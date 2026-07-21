import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_pain",
	name: "Power Word: Pain",
	description:
		"Speak a word of torment that inflicts intense necrotic damage, draining the life from your foe.",
	icon: "skills/occultist/power_word_pain.png",
	pool: "occultist",
	category: "spell",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+15",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
