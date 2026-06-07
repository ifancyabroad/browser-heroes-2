import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "doom_song",
	name: "Doom Song",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9enw-PYC96nmN7s5Sh?alt=media&token=9b911c40-20eb-47f8-b556-dacaadec84e7",
	pool: "unique",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 1,
		save: {
			attribute: "wisdom",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "wisdom",
				includeProficiency: true,
				bonus: 0,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "constitution",
					operation: "add",
					value: -10,
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
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
					stat: "constitution",
					operation: "add",
					value: -15,
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
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
					stat: "constitution",
					operation: "add",
					value: -20,
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
