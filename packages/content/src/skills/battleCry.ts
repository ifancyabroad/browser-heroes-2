import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "Amplify your strength with a resounding Battle Cry.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "strength",
					type: "stat",
					value: 6,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhggr8CtVaNEZYVBilF?alt=media&token=a574eb3a-0e7e-4582-ac8b-a8fa654ff4a0",
	level: 1,
	maxUses: 8,
	name: "Battle Cry",
	price: 0,
	id: "battle_cry",
});
