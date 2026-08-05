import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description: "Become impervious to fire, cold, and lightning for a short time.",
	icon: "skills/fighter/elemental_shield.png",
	pool: "fighter",
	kind: "technique",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "fire",
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "cold",
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "lightning",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
