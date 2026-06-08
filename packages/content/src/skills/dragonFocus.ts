import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_focus",
	name: "Dragon Focus",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIBl5fB-L23FChaK9-?alt=media&token=6985ca0f-caca-4413-a468-376907ef7d01",
	pool: "common",
	category: "buff",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 2,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 3,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "attackRollBonus",
					operation: "add",
					value: 4,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
