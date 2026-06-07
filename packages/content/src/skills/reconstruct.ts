import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reconstruct",
	name: "Reconstruct",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eRbMQ_TW85fhd_iC_?alt=media&token=37961e33-b999-4f09-82e2-f6fa760630a8",
	pool: "unique",
	category: "heal",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 1,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "1d12+8",
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "slashing_resistance_up",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 3,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d12+7",
				},
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
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d12+14",
				},
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
			],
		},
	],
	tags: [],
});
