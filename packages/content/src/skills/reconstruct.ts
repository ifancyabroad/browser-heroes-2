import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reconstruct",
	name: "Reconstruct",
	description: "Rebuild damaged components while reinforcing the body against physical attacks.",
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
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 4,
		},
	],
	tags: [],
});
