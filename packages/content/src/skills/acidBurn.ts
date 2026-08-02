import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_burn",
	name: "Acid Burn",
	description: "Fling acid at the enemy to corrode their defense.",
	icon: "skills/rogue/acid_burn.png",
	pool: "rogue",
	kind: "technique",
	category: "damage",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "1d12",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
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
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -5,
			durationTurns: 4,
		},
	],
	tags: [],
});
