import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acrobatic_strike",
	name: "Acrobatic Strike",
	description: "Strike the enemy from above as you leap over them in an attempt to get behind.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqZdRYK5clYyJxqQKi?alt=media&token=7529994a-db1d-47e4-8a6f-b1b517e85d8c",
	pool: "assassin",
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
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "modifyStat",
									target: "self",
									stat: "critChance",
									operation: "add",
									value: 5,
									durationTurns: 1,
								},
							],
						},
					],
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
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "modifyStat",
									target: "self",
									stat: "critChance",
									operation: "add",
									value: 8,
									durationTurns: 2,
								},
							],
						},
					],
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
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "modifyStat",
									target: "self",
									stat: "critChance",
									operation: "add",
									value: 10,
									durationTurns: 3,
								},
							],
						},
					],
				},
			],
		},
	],
	tags: [],
});
