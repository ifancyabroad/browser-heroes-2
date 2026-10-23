import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_protection",
	name: "Divine Protection",
	description: "Gain immunity to radiant and necrotic damage.",
	icon: "skills/cleric/divine_protection.png",
	pool: "cleric",
	kind: "prayer",
	category: "defensive",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "radiant",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "necrotic",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
