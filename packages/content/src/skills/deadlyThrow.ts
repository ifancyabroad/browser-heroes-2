import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deadly_throw",
	name: "Deadly Throw",
	description:
		"Make three ranged attacks that deal piercing damage, rolling separately for each attack.",
	icon: "skills/assassin/deadly_throw.png",
	pool: "assassin",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "1d6",
			attribute: "dexterity",
			requiresAttackRoll: true,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "1d6",
			attribute: "dexterity",
			requiresAttackRoll: true,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "1d6",
			attribute: "dexterity",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
