import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "prayer",
	name: "Prayer",
	description:
		"Call upon divine favor to boost radiant damage and to provide protection from harmful effects.",
	icon: "skills/cleric/prayer.png",
	pool: "cleric",
	kind: "prayer",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "radiant",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "savingThrowBonus",
			value: 5,
			durationTurns: 8,
		},
	],
	tags: [],
});
