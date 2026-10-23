import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_arrow",
	name: "Flame Arrow",
	description: "Make a ranged attack that deals fire damage.",
	icon: "skills/warlock/flame_arrow.png",
	pool: "warlock",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
