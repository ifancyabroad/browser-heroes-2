import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "Tap into raw fury to amplify physical power and deal greater damage.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "slashing",
					type: "damage",
					value: 50,
				},
				{
					name: "crushing",
					type: "damage",
					value: 50,
				},
				{
					name: "piercing",
					type: "damage",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
		{
			duration: 8,
			effect: "frenzy",
			target: "self",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUBEkE8QnAlklRcUe4?alt=media&token=9bc125b8-862a-4744-bb4a-4cabb7069e6e",
	level: 3,
	maxUses: 4,
	name: "Rage",
	price: 0,
	id: "rage",
});
