import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "eye_ray",
	name: "Eye Ray",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3fgWvaJhBd1_Ar0AK?alt=media&token=31bbe6e1-3867-4a52-9b86-20209b2cae4f",
	pool: "unique",
	category: "spell",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+8",
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
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 1,
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 1,
		},
	],
	tags: [],
});
