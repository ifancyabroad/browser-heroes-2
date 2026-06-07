import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blessing_of_the_old_gods",
	name: "Blessing of the Old Gods",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-vWqkvavpvmdVpJ3W?alt=media&token=d94590dc-7adb-4cbf-af97-3b0825499b18",
	pool: "unique",
	category: "buff",
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
					statusId: "fire_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
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
					statusId: "fire_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
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
					statusId: "slashing_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "fire_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "lightning_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "cold_resistance_up",
					durationTurns: 7,
				},
			],
		},
	],
	tags: [],
});
