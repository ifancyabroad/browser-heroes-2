import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_arrow",
	name: "Flame Arrow",
	description: "Conjure a burning arrow and launch it with arcane precision.",
	icon: "skills/warlock/flame_arrow.png",
	pool: "warlock",
	kind: "spellAttack",
	category: "damage",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
