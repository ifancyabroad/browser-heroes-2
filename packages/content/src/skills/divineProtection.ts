import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_protection",
	name: "Divine Protection",
	description: "Invoke celestial safeguard, shielding yourself from harm and dark forces.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkR-olGXWxxR9Poqo3?alt=media&token=2aa203c7-fff6-4998-b777-bd847ae0773e",
	pool: "cleric",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 6,
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
				{
					type: "applyStatus",
					target: "self",
					statusId: "radiant_resistance_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "necrotic_resistance_up",
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
				{
					type: "applyStatus",
					target: "self",
					statusId: "radiant_resistance_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "necrotic_resistance_up",
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
				{
					type: "applyStatus",
					target: "self",
					statusId: "radiant_resistance_up",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "necrotic_resistance_up",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
