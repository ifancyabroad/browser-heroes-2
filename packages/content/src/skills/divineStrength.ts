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
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 4,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "slashing",
			operation: "add",
			value: 4,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: 4,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "add",
			value: 4,
			durationTurns: 8,
		},
	],
	tags: [],
});
