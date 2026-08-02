import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_protection",
	name: "Divine Protection",
	description: "Invoke celestial safeguard, shielding yourself from harm and dark forces.",
	icon: "skills/cleric/divine_protection.png",
	pool: "cleric",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "radiant",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 6,
		},
	],
	tags: [],
});
