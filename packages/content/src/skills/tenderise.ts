import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tenderise",
	name: "Tenderise",
	description: "Beat the enemy into submission with a chance to lower physical resistances.",
	icon: "skills/barbarian/tenderise.png",
	pool: "barbarian",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "slashing",
			durationTurns: 5,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "crushing",
			durationTurns: 5,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "piercing",
			durationTurns: 5,
		},
	],
	tags: [],
});
