import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "focus_energy",
	name: "Focus Energy",
	description: "Channel your concentration to sharpen precision and increase hit accuracy.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgpG6pLRAqTW1AU0Eg?alt=media&token=049464de-0935-4c27-9f76-c3be3474a194",
	pool: "warrior",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 6,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 8,
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
					durationTurns: 9,
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
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
