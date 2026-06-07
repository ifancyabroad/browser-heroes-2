import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_energy",
	name: "Drain Energy",
	description:
		"Sap your enemy’s constitution to weaken them, while replenishing your own vitality.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTbtbVc3qk03XQO0GP?alt=media&token=d7bd191c-11cc-486a-bec4-aba3d27306fb",
	pool: "occultist",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 8,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "constitution",
				includeProficiency: true,
				bonus: 2,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "constitution",
					operation: "add",
					value: -6,
					durationTurns: 6,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 6,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "constitution",
					operation: "add",
					value: -9,
					durationTurns: 7,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 9,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "constitution",
					operation: "add",
					value: -12,
					durationTurns: 8,
				},
				{
					type: "modifyStat",
					target: "self",
					stat: "constitution",
					operation: "add",
					value: 12,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
