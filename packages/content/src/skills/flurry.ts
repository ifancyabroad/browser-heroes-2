import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flurry",
	name: "Flurry",
	description: "Unleash a rapid series of strikes, overwhelming your enemy with speed and force.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqcxgP5ITgFn-T8xj6?alt=media&token=2ccf3d59-a4f4-41ce-ba9b-7e9fccac6a6d",
	pool: "rogue",
	category: "attack",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.5,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.5,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.5,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.5,
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
					multiplier: 0.63,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.63,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.63,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.63,
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
					multiplier: 0.75,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.75,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.75,
					attackRiders: [],
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 0.75,
					attackRiders: [],
				},
			],
		},
	],
	tags: [],
});
