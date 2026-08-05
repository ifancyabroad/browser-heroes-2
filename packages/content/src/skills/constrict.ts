import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "constrict",
	name: "Constrict",
	description: "Coil around the enemy, crushing them and restricting their ability to attack.",
	icon: "skills/common/constrict.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
