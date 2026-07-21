import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "knock_down",
	name: "Knock Down",
	description:
		"Topple adversaries with the forceful Knock Down skill, sending enemies crashing to the ground in a stunning display of power.",
	icon: "skills/common/knock_down.png",
	pool: "common",
	category: "spell",
	maxUses: 1,
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
					attribute: "strength",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
	],
	tags: [],
});
