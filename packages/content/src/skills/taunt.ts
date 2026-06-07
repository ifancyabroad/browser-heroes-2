import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "taunt",
	name: "Taunt",
	description:
		"Provoke enemies into reckless attacks, lowering your armor class but greatly boosting your critical strike chance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyOBLC1CXRvTaWkjeL?alt=media&token=d9a63a20-849d-4002-b9b6-06e9ea2a9c4e",
	pool: "barbarian",
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
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: -4,
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 2,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: -6,
					durationTurns: 3,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 3,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
