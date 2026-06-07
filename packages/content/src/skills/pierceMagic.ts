import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "pierce_magic",
	name: "Pierce Magic",
	description: "Reduce the opponents magic resistance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc404KHFQ3zZaHpCbe2?alt=media&token=b2a650c7-b8ae-4b7a-93e7-fb8f090a1e85",
	pool: "mage",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 4,
		save: {
			attribute: "intelligence",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "intelligence",
				includeProficiency: true,
				bonus: 4,
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
					statusId: "cold_resistance_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "fire_resistance_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "lightning_resistance_down",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "cold_resistance_down",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "fire_resistance_down",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "lightning_resistance_down",
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "cold_resistance_down",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "fire_resistance_down",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "lightning_resistance_down",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
