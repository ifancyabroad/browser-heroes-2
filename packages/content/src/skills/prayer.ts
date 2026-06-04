import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description:
		"Call upon divine favor to boost radiant damage and to provide protection from harmful effects.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "radiant",
					type: "damage",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
		{
			duration: 8,
			effect: "bless",
			target: "self",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUH0cjt_Ek0BEIgUh?alt=media&token=ac5bf6ce-f097-45f5-b974-ee6bb37de865",
	level: 2,
	maxUses: 8,
	name: "Prayer",
	price: 0,
	id: "prayer",
});
