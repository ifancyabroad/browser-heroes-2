import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "web",
	name: "Web",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTOiesS7DlEfpA_jDR?alt=media&token=5141b1d2-6098-4490-9b6d-a6c56e24c8f3",
	pool: "common",
	category: "debuff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -8,
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
					stat: "dexterity",
					operation: "add",
					value: -12,
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
					stat: "dexterity",
					operation: "add",
					value: -16,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
