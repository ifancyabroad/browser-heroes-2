import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "whelm",
	name: "Whelm",
	icon: "skills/unique/whelm.png",
	pool: "unique",
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
			durationTurns: 2,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
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
	],
	tags: [],
});
