import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "bomb_barrage",
	name: "Bomb Barrage",
	description:
		"Deal crushing damage to the enemy four times. Each bomb allows a Dexterity saving throw for half damage.",
	icon: "skills/unique/bomb_barrage.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "2d6",
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
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "2d6",
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
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "2d6",
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
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "2d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
