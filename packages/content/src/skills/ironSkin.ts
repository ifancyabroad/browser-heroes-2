import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Gain resistance to slashing, crushing, and piercing damage.",
	icon: "skills/warlock/iron_skin.png",
	pool: "warlock",
	kind: "spell",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			duration: { unit: "battles", value: 5 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			duration: { unit: "battles", value: 5 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
