import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "make_it_rain",
	name: "Make it Rain",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9_bwdIr8BegxbOjPip?alt=media&token=9ac6a519-98ab-479d-9c80-e2d90fafb13a",
	pool: "unique",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 2,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d8+3",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d8+3",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d8+3",
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
					dice: "2d8+1",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d8+1",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d8+1",
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
					dice: "2d8+4",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d8+4",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d8+4",
				},
			],
		},
	],
	tags: [],
});
