import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "kick",
	name: "Kick",
	description:
		"Deliver a swift kick with a chance to knock your opponent off balance and stun them.",
	icon: "skills/rogue/kick.png",
	pool: "rogue",
	kind: "technique",
	category: "damage",
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
