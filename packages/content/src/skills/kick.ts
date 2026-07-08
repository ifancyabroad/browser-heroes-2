import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "kick",
	name: "Kick",
	description:
		"Deliver a swift kick with a chance to knock your opponent off balance and stun them.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh0AreyuN6wco1X_6B?alt=media&token=bd7521b3-bc47-411c-b523-7eeaf987f773",
	pool: "rogue",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d6",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
	],
	tags: [],
});
