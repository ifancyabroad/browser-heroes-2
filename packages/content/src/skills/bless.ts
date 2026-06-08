import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "bless",
	name: "Bless",
	description:
		"Invoke a sacred boon that grants the blessed effect, ensuring all saving throws succeed.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkFjgyu0pTYRw3DVD-?alt=media&token=a19ceedb-9e70-46fb-a0b1-34a68b122a7d",
	pool: "common",
	category: "buff",
	maxUses: 8,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "savingThrowBonus",
					operation: "add",
					value: 5,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "savingThrowBonus",
					operation: "add",
					value: 8,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "savingThrowBonus",
					operation: "add",
					value: 10,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
