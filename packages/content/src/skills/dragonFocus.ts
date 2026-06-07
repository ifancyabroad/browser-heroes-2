import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_focus",
	name: "Dragon Focus",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIBl5fB-L23FChaK9-?alt=media&token=6985ca0f-caca-4413-a468-376907ef7d01",
	pool: "common",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 2,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
