import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Harden the skin to greatly increase physical resistance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3yE_BOq5Xmhy4LvbI?alt=media&token=7098ab93-e0ec-486f-9f9b-2715b57815b6",
	pool: "warlock",
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
			],
		},
		{
			rank: 2,
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
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "slashing_resistance_up",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "crushing_resistance_up",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "piercing_resistance_up",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
