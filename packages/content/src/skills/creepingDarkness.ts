import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "creeping_darkness",
	name: "Creeping Darkness",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJlQdMjqgglotq5k6C?alt=media&token=17097725-a9f6-4e57-a95e-9447d96a91d4",
	pool: "common",
	category: "debuff",
	maxUses: 3,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					operation: "add",
					value: -2,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "critChance",
					operation: "add",
					value: -5,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					operation: "add",
					value: -3,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "critChance",
					operation: "add",
					value: -7,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					operation: "add",
					value: -4,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "critChance",
					operation: "add",
					value: -10,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
