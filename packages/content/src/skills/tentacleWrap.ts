import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tentacle_wrap",
	name: "Tentacle Wrap",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGPUhNeKidpE71VeJ3?alt=media&token=2bfccf37-afd1-4916-81bf-03a20675d15f",
	pool: "common",
	category: "spell",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
		},
	],
	tags: [],
});
