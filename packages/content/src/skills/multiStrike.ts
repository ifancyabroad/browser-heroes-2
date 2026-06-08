import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_strike",
	name: "Multi Strike",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJ653IrMrMC4NtDiZ0?alt=media&token=c1252dde-ce75-4ee0-bfaa-b5c108be2294",
	pool: "common",
	category: "attack",
	maxUses: 3,
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
