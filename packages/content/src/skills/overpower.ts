import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overpower",
	name: "Overpower",
	icon: "skills/common/overpower.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			durationTurns: 3,
		},
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
	],
	tags: [],
});
