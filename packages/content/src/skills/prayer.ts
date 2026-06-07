import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "prayer",
	name: "Prayer",
	description:
		"Call upon divine favor to boost radiant damage and to provide protection from harmful effects.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUH0cjt_Ek0BEIgUh?alt=media&token=ac5bf6ce-f097-45f5-b974-ee6bb37de865",
	pool: "cleric",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 8,
	},
	ranks: [
		{
			rank: 1,
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
					type: "applyStatus",
					target: "self",
					statusId: "bless",
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "radiant",
					operation: "add",
					value: 75,
					durationTurns: 9,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "bless",
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "radiant",
					operation: "add",
					value: 100,
					durationTurns: 10,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "bless",
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
