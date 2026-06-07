import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tenderise",
	name: "Tenderise",
	description: "Beat the enemy into submission with a chance to lower physical resistances.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqXb0gVgqwcQmz5Kty?alt=media&token=888faf17-25f3-4981-b1d4-34a7017ebade",
	pool: "barbarian",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 4,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "constitution",
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
					statusId: "slashing_resistance_down",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
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
					statusId: "slashing_resistance_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
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
					statusId: "slashing_resistance_down",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
