import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "uppercut",
	name: "Uppercut",
	description: "A powerful upward strike with a chance to daze and stun your opponent.",
	icon: "skills/warrior/uppercut.png",
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
