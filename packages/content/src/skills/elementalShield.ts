import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description: "Raise a protective ward that resists fire, cold, and lightning for the battle.",
	icon: "skills/fighter/elemental_shield.png",
	pool: "fighter",
	kind: "technique",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
