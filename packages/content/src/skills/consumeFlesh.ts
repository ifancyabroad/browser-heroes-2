import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "consume_flesh",
	name: "Consume Flesh",
	description:
		"Bite into the enemy, dealing piercing damage, halved on a successful Constitution saving throw. Restore your HP with a separate healing roll.",
	icon: "skills/unique/consume_flesh.png",
	pool: "unique",
	kind: "technique",
	category: "heal",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "2d8",
			attribute: "strength",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "heal",
			target: "self",
			dice: "3d6",
		},
	],
	tags: [],
});
