import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_strength",
	name: "Divine Strength",
	description: "Increase your attack roll bonus and physical damage dealt.",
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
			operation: "multiply",
			value: 1.25,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
