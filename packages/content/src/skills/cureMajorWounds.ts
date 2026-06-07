import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_major_wounds",
	name: "Cure Major Wounds",
	description: "Restore a significant amount of health, healing even the most grievous injuries.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUQdooGB1fZa6Q-pv?alt=media&token=98005b9d-49d9-4a20-a366-91a1d99852c5",
	pool: "cleric",
	category: "heal",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 2,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d12+8",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "3d12+11",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "4d12+14",
					attribute: "wisdom",
				},
			],
		},
	],
	tags: [],
});
