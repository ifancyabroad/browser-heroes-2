import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description:
		"Summon a protective barrier infused with elemental energy to guard against attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCz3gjt9HaaTCJh2XIS?alt=media&token=32b231dd-9a2e-4b5d-997c-4647a8fcb717",
	pool: "warrior",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "fire_resistance_up",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
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
					statusId: "fire_resistance_up",
					durationTurns: 9,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 9,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
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
					statusId: "fire_resistance_up",
					durationTurns: 10,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 10,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
