import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_inspiration",
	name: "Divine Inspiration",
	description:
		"Receive a surge of divine power, greatly enhancing strength, dexterity, and constitution to improve your combat abilities.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTXdELX-HExDeZ8y6L?alt=media&token=b51b7b94-f31d-4c63-8282-a5c8adc911a1",
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
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 8,
					durationTurns: 8,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "dexterity",
					operation: "add",
					value: 8,
					durationTurns: 8,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 8,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 12,
					durationTurns: 9,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "dexterity",
					operation: "add",
					value: 12,
					durationTurns: 9,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 12,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "strength",
					operation: "add",
					value: 16,
					durationTurns: 10,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "dexterity",
					operation: "add",
					value: 16,
					durationTurns: 10,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 16,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
