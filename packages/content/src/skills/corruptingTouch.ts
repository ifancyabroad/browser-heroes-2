import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corrupting_touch",
	name: "Corrupting Touch",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkZtl6i7THVGIaWaQR?alt=media&token=196c494d-dcca-4687-9f79-92d97c171f04",
	pool: "common",
	category: "spell",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "wisdom",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 2,
		},
	],
	tags: [],
});
