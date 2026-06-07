import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reckless_assault",
	name: "Reckless Assault",
	description:
		"Launch a fierce attack combining fire and crushing damage, with a risk of leaving yourself stunned.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyIphJAxFajeUy4Ru1?alt=media&token=ff9a0bae-c3b9-467a-a907-426e8444107b",
	pool: "barbarian",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 2,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "constitution",
				includeProficiency: true,
				bonus: 0,
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
					statusId: "stun",
					durationTurns: 1,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d12+8",
					attribute: "strength",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d12+8",
					attribute: "strength",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "stun",
					durationTurns: 2,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+7",
					attribute: "strength",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d12+7",
					attribute: "strength",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "self",
					statusId: "stun",
					durationTurns: 3,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+14",
					attribute: "strength",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d12+14",
					attribute: "strength",
				},
			],
		},
	],
	tags: [],
});
