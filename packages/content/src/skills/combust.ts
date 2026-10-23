import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "combust",
	name: "Combust",
	description: "Deal fire damage to yourself and the enemy.",
	icon: "skills/unique/combust.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "self",
			damageType: "fire",
			damageClass: "other",
			dice: "15d12",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "other",
			dice: "15d12",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
