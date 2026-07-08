import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "engulf",
	name: "Engulf",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGREObRlRFCR7M2Ni4?alt=media&token=a9d9314a-5813-4428-ac32-a6e8724f9222",
	pool: "unique",
	category: "spell",
	maxUses: 7,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d12+8",
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
			type: "modifyStat",
			target: "enemy",
			stat: "dexterity",
			operation: "add",
			value: -4,
			durationTurns: 3,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "fire",
			durationTurns: 3,
		},
	],
	tags: [],
});
