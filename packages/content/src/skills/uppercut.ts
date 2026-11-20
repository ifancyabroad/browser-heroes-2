import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "uppercut",
	name: "Uppercut",
	description:
		"Deal crushing damage to the enemy, halved on a successful Constitution saving throw. A separate failed Constitution saving throw stuns them for 2 turns.",
	icon: "skills/fighter/uppercut.png",
	pool: "fighter",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
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
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
