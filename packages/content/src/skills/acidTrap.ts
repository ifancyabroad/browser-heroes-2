import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_trap",
	name: "Acid Trap",
	description: "Trap your enemy to incapacitate them and reduce their defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdkxMP9wTCz81_T4e?alt=media&token=ff085bdf-6540-4975-9837-bbf5a6d3a5bc",
	pool: "rogue",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 3,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "dexterity",
				includeProficiency: true,
				bonus: 6,
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
					statusId: "stun",
					durationTurns: 1,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "acid_resistance_down",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "acid_resistance_down",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stun",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "acid_resistance_down",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
