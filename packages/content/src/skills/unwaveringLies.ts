import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unwavering_lies",
	name: "Unwavering Lies",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC8_KrCSlLCSAitJUg6?alt=media&token=df0b551d-d289-423a-a18a-b0e85db738fc",
	pool: "unique",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "intelligence",
			operation: "add",
			value: -5,
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "wisdom",
			operation: "add",
			value: -5,
			durationTurns: 3,
		},
	],
	tags: [],
});
