import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "whirlwind_strike",
	name: "Whirlwind Strike",
	description:
		"Unleash a flurry of attacks in a spinning motion, hitting your foe three times in quick succession.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqUWZDeys5x3n8eLNA?alt=media&token=74ce578b-3e45-44d2-8565-ccd0187437d0",
	pool: "barbarian",
	category: "attack",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1,
					attackRiders: [],
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.25,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.25,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.25,
					attackRiders: [],
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.5,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.5,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.5,
					attackRiders: [],
				},
			],
		},
	],
	tags: [],
});
