import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "last_stand",
	name: "Last Stand",
	description:
		"Summon your remaining strength to recover health and temporarily bolster your physical resilience.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHm6ropyvvjWSACK2Gc?alt=media&token=19ebde6c-7a8f-45b6-b288-102706f7ffaf",
	pool: "warrior",
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
					type: "applyStatus",
					target: "self",
					statusId: "slashing_resistance_up",
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 2,
				},
				{
					type: "heal",
					target: "self",
					dice: "18d6+7",
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
				{
					type: "heal",
					target: "self",
					dice: "27d6+7",
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
					type: "heal",
					target: "self",
					dice: "36d6+7",
				},
			],
		},
	],
	tags: [],
});
