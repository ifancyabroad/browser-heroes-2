import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description:
		"Release a fearsome bellow that shakes enemies, reducing their physical damage output.",
	effects: [
		{
			difficulty: 19,
			duration: 4,
			modifier: "wisdom",
			properties: [
				{
					name: "slashing",
					type: "damage",
					value: -50,
				},
				{
					name: "crushing",
					type: "damage",
					value: -50,
				},
				{
					name: "piercing",
					type: "damage",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-ODDidCmcQZoicnvq99Q?alt=media&token=3cc7e953-5373-4cb2-9f48-9d71cba0c175",
	level: 3,
	maxUses: 4,
	name: "Intimidating Shout",
	price: 0,
	id: "intimidating_shout",
});
