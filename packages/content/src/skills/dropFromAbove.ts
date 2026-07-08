import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drop_from_above",
	name: "Drop from Above",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4o-B22zajLRPINRfV?alt=media&token=35e3da97-d73c-4b4f-982c-30174dabdb12",
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
					attribute: "constitution",
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
