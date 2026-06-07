import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unwavering_lies",
	name: "Unwavering Lies",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC8_KrCSlLCSAitJUg6?alt=media&token=df0b551d-d289-423a-a18a-b0e85db738fc",
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
				bonus: 5,
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
					statusId: "necrotic_resistance_down",
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -5,
					durationTurns: 3,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "wisdom",
					operation: "add",
					value: -5,
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
					statusId: "necrotic_resistance_down",
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -7,
					durationTurns: 4,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "wisdom",
					operation: "add",
					value: -7,
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
					statusId: "necrotic_resistance_down",
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "intelligence",
					operation: "add",
					value: -10,
					durationTurns: 5,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "wisdom",
					operation: "add",
					value: -10,
					durationTurns: 5,
				},
			],
		},
	],
	tags: [],
});
