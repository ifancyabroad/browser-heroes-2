import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_arrow",
	name: "Frost Arrow",
	description: "Conjure a shard of ice and launch it with deadly precision.",
	icon: "skills/mage/frost_arrow.png",
	pool: "mage",
	kind: "spellAttack",
	category: "damage",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
