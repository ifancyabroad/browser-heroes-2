import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "into_the_grinder",
	name: "Into the Grinder",
	description:
		"Drag the enemy into a grinding maw that crushes them and leaves corrosive wounds.",
	icon: "skills/unique/into_the_grinder.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "melee",
			dice: "5d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "acid",
			damageClass: "other",
			dice: "2d6",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
