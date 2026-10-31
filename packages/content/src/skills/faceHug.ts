import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "face_hug",
	name: "Face Hug",
	description:
		"Give the enemy disadvantage on attack rolls, silence them, and deal piercing damage over time for 3 turns, each requiring a separate failed Dexterity saving throw.",
	icon: "skills/unique/face_hug.png",
	pool: "unique",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			dice: "2d6",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
