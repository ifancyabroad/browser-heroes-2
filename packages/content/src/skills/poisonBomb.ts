import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bomb",
	name: "Poison Bomb",
	description: "Throw a poisoned explosive at the enemy with a chance to poison them.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqbgWmfMqnnjnXn-Hp?alt=media&token=7b653a63-5cb5-41f1-aafe-45beb0b53579",
	pool: "assassin",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 6,
		save: {
			attribute: "constitution",
			onSuccess: "noEffect",
			dc: {
				base: 8,
				attribute: "dexterity",
				includeProficiency: true,
				bonus: 3,
			},
		},
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "1d8",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d8-2",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "2d8",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
