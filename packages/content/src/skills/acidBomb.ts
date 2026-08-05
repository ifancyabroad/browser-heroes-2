import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bomb",
	name: "Acid Bomb",
	description:
		"Throw a volatile bomb that scorches the enemy with fire and acid while corroding their armour.",
	icon: "skills/thief/acid_bomb.png",
	pool: "thief",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "3d8",
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
			damageType: "acid",
			dice: "3d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -3,
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
