import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "da_bomb",
	name: "Da Bomb",
	description:
		"Deal crushing and fire damage to the enemy, each halved on a successful Dexterity saving throw. A separate failed Constitution saving throw stuns them for 1 turn.",
	icon: "skills/unique/da_bomb.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "6d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "other",
			attackRange: "ranged",
			dice: "6d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
