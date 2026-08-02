import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_protection",
	name: "Divine Protection",
	description:
		"Invoke a celestial safeguard against divine radiance and the consuming power of death.",
	icon: "skills/cleric/divine_protection.png",
	pool: "cleric",
	kind: "prayer",
	category: "defensive",
	maxUses: 4,
	effects: [
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
			affinity: "immunity",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 6,
		},
	],
	tags: [],
});
