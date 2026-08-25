import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_arrow",
	name: "Frost Arrow",
	description: "Conjure a shard of ice and launch it with deadly precision.",
	icon: "skills/wizard/frost_arrow.png",
	pool: "wizard",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
