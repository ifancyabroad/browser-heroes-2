import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_confusion",
	name: "Power Word: Confusion",
	description:
		"Speak a disorienting word that has a chance to charm or blind the enemy, leaving them confused and vulnerable.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6P21THAWT0E0VgnjP?alt=media&token=f59fa068-f3d0-47ed-91af-92b438cb3825",
	pool: "occultist",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 2,
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
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "charm",
					durationTurns: 3,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "charm",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "charm",
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
