import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "disease_shot",
	name: "Disease Shot",
	icon: "skills/common/disease_shot.png",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			dice: "1d12+8",
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
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			dice: "1d6",
			durationTurns: 4,
		},
	],
	tags: [],
});
