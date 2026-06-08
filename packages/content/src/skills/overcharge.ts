import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overcharge",
	name: "Overcharge",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJykYbURtCWS-6Ljqx?alt=media&token=17d79da7-a922-46b4-9549-08430f08e57e",
	pool: "unique",
	category: "spell",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d12+8",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "2d12+8",
					requiresAttackRoll: false,
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
					dice: "3d12+11",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "3d12+11",
					requiresAttackRoll: false,
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
					dice: "4d12+14",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "4d12+14",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
