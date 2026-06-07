import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "breath_of_the_dawnflame",
	name: "Breath of the Dawnflame",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCKA2eOBOjwhJeBr4Ou?alt=media&token=1ab19e49-6f25-4374-82a7-4d650e715788",
	pool: "unique",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 5,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "3d12+16",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "3d12+16",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "5d12+18",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "5d12+18",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "6d12+28",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "6d12+28",
				},
			],
		},
	],
	tags: [],
});
