import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "growth",
	name: "Growth",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O8D3hp6-sDMDNT122yT?alt=media&token=4901860c-7d53-4de3-b85a-7d90ffc81233",
	pool: "common",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 2,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 2,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 3,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 3,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 4,
					durationTurns: 7,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 4,
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
