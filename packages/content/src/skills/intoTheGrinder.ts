import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "into_the_grinder",
	name: "Into the Grinder",
	icon: "skills/unique/into_the_grinder.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "2d6+2",
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
			dice: "2d6+2",
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
			value: -3,
			durationTurns: 4,
		},
	],
	tags: [],
});
