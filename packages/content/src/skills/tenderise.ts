import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tenderise",
	name: "Tenderise",
	description: "Beat the enemy into submission with a chance to lower physical resistances.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqXb0gVgqwcQmz5Kty?alt=media&token=888faf17-25f3-4981-b1d4-34a7017ebade",
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
