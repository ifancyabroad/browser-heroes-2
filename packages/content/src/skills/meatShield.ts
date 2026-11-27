import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "meat_shield",
	name: "Meat Shield",
	description:
		"Deal crushing damage to the enemy and gain a temporary shield that absorbs incoming damage, but temporarily reduce all damage you deal.",
	icon: "skills/unique/meat_shield.png",
	pool: "unique",
	kind: "technique",
	category: "defensive",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "4d8",
			attribute: "strength",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "shield",
			target: "self",
			amount: 30,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 0.75,
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
