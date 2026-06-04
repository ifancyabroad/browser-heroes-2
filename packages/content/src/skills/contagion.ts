import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Infect the enemy with a virulent poison, significantly increasing the damage over time as it spreads through their system.",
	effects: [
		{
			difficulty: 19,
			duration: 6,
			effect: "poison",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
		{
			duration: 6,
			properties: [
				{
					name: "poison",
					type: "damage",
					value: 100,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6DWEvSdPHN3sCBzuV?alt=media&token=29173920-9308-4195-a763-56e611914d4b",
	level: 4,
	maxUses: 2,
	name: "Contagion",
	price: 0,
	id: "contagion",
});
