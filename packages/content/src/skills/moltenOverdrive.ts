import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "molten_overdrive",
	name: "Molten Overdrive",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCK1lVEhQnzlaTAST3j?alt=media&token=7979c186-71db-4fd9-9147-1b0bf2479ca7",
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
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: 50,
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
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 7,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: 75,
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
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 8,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "crushing",
					operation: "add",
					value: 100,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
