import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_pain",
	name: "Power Word: Pain",
	description: "Deal necrotic damage to the enemy without an attack roll or saving throw.",
	icon: "skills/occultist/power_word_pain.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "5d10",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
