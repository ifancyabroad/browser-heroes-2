import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reconstruct",
	name: "Reconstruct",
	icon: "skills/unique/reconstruct.png",
	pool: "unique",
	kind: "technique",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "1d12+8",
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			durationTurns: 3,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 3,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 3,
		},
	],
	tags: [],
});
