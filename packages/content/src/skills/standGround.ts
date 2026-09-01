import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stand_ground",
	name: "Stand Ground",
	description: "Stand your ground to halve physical damage but reduce mobility.",
	icon: "skills/fighter/stand_ground.png",
	pool: "fighter",
	kind: "technique",
	category: "defensive",
	rarity: "common",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageTaken",
			target: "self",
			damageClass: "physical",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "disadvantage",
			attribute: "dexterity",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
