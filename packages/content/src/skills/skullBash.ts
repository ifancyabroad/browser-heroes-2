import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "skull_bash",
	name: "Skull Bash",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUDaUsTx_tLKhlQzc6?alt=media&token=65159a77-f38c-4e64-be8f-589968f22505",
	pool: "common",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 5,
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
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d8+3",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 6,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d8+1",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "crushing_resistance_down",
					durationTurns: 7,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d8+4",
				},
			],
		},
	],
	tags: [],
});
