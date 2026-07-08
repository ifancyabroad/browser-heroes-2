import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "psionic_blast",
	name: "Psionic Blast",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3JZltm890qLBu0MtB?alt=media&token=004fdcea-3a31-425c-9f87-c9050ac4cb2b",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
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
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
		},
	],
	tags: [],
});
