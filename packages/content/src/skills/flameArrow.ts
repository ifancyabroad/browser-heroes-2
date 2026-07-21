import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_arrow",
	name: "Flame Arrow",
	description: "Conjure a flame arrow.",
	icon: "skills/warlock/flame_arrow.png",
	pool: "warlock",
	category: "spell",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
