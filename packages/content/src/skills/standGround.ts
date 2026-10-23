import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stand_ground",
	name: "Stand Ground",
	description:
		"Reduce physical damage you take, but gain disadvantage on Dexterity saving throws.",
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
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "disadvantage",
			attribute: "dexterity",
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
