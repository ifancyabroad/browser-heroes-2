import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_spray",
	name: "Acid Spray",
	icon: "skills/common/acid_spray.png",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "1d10+5",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "dexterity",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			durationTurns: 6,
		},
	],
	tags: [],
});
