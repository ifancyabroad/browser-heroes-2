import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reckless_assault",
	name: "Reckless Assault",
	description:
		"Make a melee attack that deals fire damage, then become stunned even if the attack misses.",
	icon: "skills/barbarian/reckless_assault.png",
	pool: "barbarian",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "physical",
			attackRange: "melee",
			dice: "10d10",
			attribute: "strength",
			requiresAttackRoll: true,
		},
		{
			type: "applyStatus",
			target: "self",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
		},
	],
	tags: [],
});
