import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "into_the_grinder",
	name: "Into the Grinder",
	icon: "skills/unique/into_the_grinder.png",
	pool: "unique",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "1d8+5",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
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
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d8+5",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
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
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			operation: "add",
			value: -3,
			durationTurns: 4,
		},
	],
	tags: [],
});
