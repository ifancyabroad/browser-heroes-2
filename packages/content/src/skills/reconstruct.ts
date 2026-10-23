import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reconstruct",
	name: "Reconstruct",
	description: "Restore your HP and gain resistance to slashing, crushing, and piercing damage.",
	icon: "skills/unique/reconstruct.png",
	pool: "unique",
	kind: "technique",
	category: "heal",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "8d8",
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
