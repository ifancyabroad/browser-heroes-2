import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "hunterss_mark",
	name: "Hunters's Mark",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCyGQhU_sx4-m68ZoQs?alt=media&token=28c9604f-8d09-4c21-afe1-ebc6b258c750",
	pool: "common",
	category: "debuff",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 2,
		save: {
			attribute: "dexterity",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "dexterity",
				includeProficiency: true,
				bonus: 4,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "hitChance_auxiliaryStat_up",
					durationTurns: 4,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 4,
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
					durationTurns: 5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 5,
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
					durationTurns: 6,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "piercing_resistance_down",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
