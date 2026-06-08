import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_shot",
	name: "Multi Shot",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-KtM9y-zKPmVbOwsO?alt=media&token=fad213f7-bc3e-4374-8ab1-d50259c9899b",
	pool: "common",
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
			],
		},
	],
	tags: [],
});
