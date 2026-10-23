import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corruption",
	name: "Corruption",
	description:
		"Make the enemy vulnerable to necrotic damage and deal necrotic damage over time, each requiring a separate failed Constitution saving throw.",
	icon: "skills/warlock/corruption.png",
	pool: "warlock",
	kind: "spell",
	category: "debuff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "1d4",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
