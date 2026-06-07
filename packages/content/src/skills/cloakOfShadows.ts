import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cloak_of_shadows",
	name: "Cloak Of Shadows",
	description: "Shroud yourself in dark energy, enhancing resistance to elemental attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdUiFhyxCULAsWYJl?alt=media&token=ab345aab-5ea3-49ef-81e8-ed3481946db6",
	pool: "assassin",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 3,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "fire_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 5,
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
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 6,
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
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
