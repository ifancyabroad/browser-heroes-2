import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "will_of_the_deceiver",
	name: "WIll of the Deceiver",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC8YYxJjpDUyJWCV-HR?alt=media&token=c5c03231-3bea-416e-8360-4a096d032e89",
	pool: "unique",
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
					target: "self",
					statusId: "slashing_resistance_up",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "poison_resistance_up",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "acid_resistance_up",
					durationTurns: 4,
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
					target: "self",
					statusId: "slashing_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "poison_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "acid_resistance_up",
					durationTurns: 5,
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
					target: "self",
					statusId: "slashing_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "poison_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "acid_resistance_up",
					durationTurns: 6,
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
