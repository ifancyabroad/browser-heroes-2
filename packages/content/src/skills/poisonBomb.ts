import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bomb",
	name: "Poison Bomb",
	description:
		"Burst a poison bomb around the enemy, dealing immediate harm and lingering venom.",
	icon: "skills/assassin/poison_bomb.png",
	pool: "assassin",
	kind: "technique",
	category: "damage",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			damageClass: "other",
			dice: "2d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			damageClass: "other",
			dice: "2d4",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
