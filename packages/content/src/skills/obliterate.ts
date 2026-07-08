import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "obliterate",
	name: "Obliterate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4ec48-KD77fXEGDx8?alt=media&token=10218c46-11e1-4597-ae2d-545151ea8879",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d12+15",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "slashing",
			durationTurns: 3,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "crushing",
			durationTurns: 3,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "piercing",
			durationTurns: 3,
		},
	],
	tags: [],
});
