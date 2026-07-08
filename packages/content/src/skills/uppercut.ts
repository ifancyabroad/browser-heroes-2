import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "uppercut",
	name: "Uppercut",
	description: "A powerful upward strike with a chance to daze and stun your opponent.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCyDgXDjHjrqD_5UViJ?alt=media&token=94e20229-12c4-465c-9504-925219a87cfe",
	pool: "warrior",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 4,
				},
			},
		},
	],
	tags: [],
});
