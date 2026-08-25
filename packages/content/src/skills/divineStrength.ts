import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_strength",
	name: "Divine Strength",
	description:
		"Infuse yourself with divine might, empowering the accuracy and damage of physical attacks.",
	icon: "skills/cleric/divine_strength.png",
	pool: "cleric",
	kind: "prayer",
	category: "buff",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			duration: { unit: "battles", value: 5 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageClass: "physical",
			operation: "add",
			value: 2,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
