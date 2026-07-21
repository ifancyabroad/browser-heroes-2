import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reckless_assault",
	name: "Reckless Assault",
	description:
		"Launch a fierce attack combining fire and crushing damage, with a risk of leaving yourself stunned.",
	icon: "skills/barbarian/reckless_assault.png",
	pool: "barbarian",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "applyStatus",
			target: "self",
			statusId: "stunned",
			durationTurns: 1,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d12+8",
			attribute: "strength",
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
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d12+8",
			attribute: "strength",
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
	],
	tags: [],
});
