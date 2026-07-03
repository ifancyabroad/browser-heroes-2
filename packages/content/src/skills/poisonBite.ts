import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bite",
	name: "Poison Bite",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTOJ5N4B3V55HpTl-8?alt=media&token=9e866550-b99b-4c0f-b146-d98d34634113",
	pool: "common",
	category: "attack",
	maxUses: 4,
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
									type: "damageOverTime",
									target: "enemy",
									damageType: "poison",
									dice: "1d4",
									durationTurns: 4,
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
									type: "damageOverTime",
									target: "enemy",
									damageType: "poison",
									dice: "1d6",
									durationTurns: 5,
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
									type: "damageOverTime",
									target: "enemy",
									damageType: "poison",
									dice: "1d8",
									durationTurns: 6,
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
