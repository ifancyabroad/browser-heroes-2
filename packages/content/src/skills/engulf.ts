import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "engulf",
	name: "Engulf",
	description:
		"Surround the enemy in living flame that burns immediately and continues to consume them.",
	icon: "skills/unique/engulf.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "4d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "2d6",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
