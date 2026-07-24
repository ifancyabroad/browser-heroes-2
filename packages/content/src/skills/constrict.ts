import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "constrict",
	name: "Constrict",
	icon: "skills/common/constrict.png",
	pool: "common",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
