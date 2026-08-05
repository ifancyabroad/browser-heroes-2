import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Harden the skin to greatly increase physical resistance.",
	icon: "skills/warlock/iron_skin.png",
	pool: "warlock",
	kind: "spell",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
