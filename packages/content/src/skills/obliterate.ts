import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "obliterate",
	name: "Obliterate",
	description:
		"Crush the enemy with overwhelming force and potentially leave their body vulnerable to further damage.",
	icon: "skills/common/obliterate.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "legendary",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			dice: "6d12",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "modifyDamageTaken",
			target: "enemy",
			operation: "multiply",
			value: 1.5,
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
