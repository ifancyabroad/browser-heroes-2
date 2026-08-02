import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bomb",
	name: "Poison Bomb",
	description: "Throw a poisoned explosive at the enemy with a chance to poison them.",
	icon: "skills/assassin/poison_bomb.png",
	pool: "assassin",
	kind: "technique",
	category: "damage",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "poison",
			dice: "1d8",
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
			dice: "1d4",
			durationTurns: 4,
		},
	],
	tags: [],
});
