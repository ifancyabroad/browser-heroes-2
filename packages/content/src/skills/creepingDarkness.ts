import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "creeping_darkness",
	name: "Creeping Darkness",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJlQdMjqgglotq5k6C?alt=media&token=17097725-a9f6-4e57-a95e-9447d96a91d4",
	pool: "common",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 3,
		save: {
			attribute: "dexterity",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "dexterity",
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
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "critChance_auxiliaryStat_down",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "critChance_auxiliaryStat_down",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "hitChance_auxiliaryStat_down",
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "critChance_auxiliaryStat_down",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
