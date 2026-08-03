import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_pain",
	name: "Power Word: Pain",
	description: "Speak an inescapable word of torment that wracks the enemy with necrotic pain.",
	icon: "skills/occultist/power_word_pain.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "5d10",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
