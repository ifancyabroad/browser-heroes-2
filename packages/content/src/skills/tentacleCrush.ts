import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tentacle_crush",
	name: "Tentacle Crush",
	icon: "skills/common/tentacle_crush.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d12+15",
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
