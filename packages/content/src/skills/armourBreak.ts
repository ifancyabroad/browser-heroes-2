import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour_break",
	name: "Armour Break",
	description: "A powerful blow that weakens an enemy's defenses.",
	icon: "skills/warrior/armour_break.png",
	pool: "warrior",
	category: "spell",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 6,
				},
			},
		},
	],
	tags: [],
});
