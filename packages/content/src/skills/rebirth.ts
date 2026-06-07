import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rebirth",
	name: "Rebirth",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCjRoh79ZTFYmagQ6I1?alt=media&token=fd1da8c1-de4c-4272-8474-4cbb77a5b9a0",
	pool: "unique",
	category: "heal",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 1,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "25d6+13",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "38d6+12",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "50d6+15",
				},
			],
		},
	],
	tags: [],
});
