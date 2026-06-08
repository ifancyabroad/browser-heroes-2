import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_screech",
	name: "Deafening Screech",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGO_dOy08BrKDH_l3L?alt=media&token=c0825b48-2dc2-4d61-ae5d-8a16b4a4a13c",
	pool: "common",
	category: "debuff",
	maxUses: 6,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -4,
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
					stat: "armourClass",
					operation: "add",
					value: -6,
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
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
