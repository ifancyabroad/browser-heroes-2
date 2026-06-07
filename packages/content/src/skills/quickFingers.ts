import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Prepare to attack with great speed, increasing critical strike chance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZq_C6vPLiGUFkYHy3u?alt=media&token=95e81572-3538-4686-bde3-70eaa9eeb15d",
	pool: "rogue",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 8,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
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
					statusId: "critChance_auxiliaryStat_up",
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
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
