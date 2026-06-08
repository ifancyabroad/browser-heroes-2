import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_slam",
	name: "Flame Slam",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCK-_ujmbDbdHYgCnl_?alt=media&token=0e48f595-2b40-4ab2-96f9-57c5746d6380",
	pool: "common",
	category: "spell",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+8",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
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
					damageType: "crushing",
					dice: "3d12+11",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
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
					damageType: "crushing",
					dice: "4d12+14",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "4d12+14",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
