import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_cloud",
	name: "Poison Cloud",
	icon: "skills/common/poison_cloud.png",
	pool: "common",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			dice: "2d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "dexterity",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			dice: "1d8",
			durationTurns: 6,
		},
	],
	tags: [],
});
