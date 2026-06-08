import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "charge",
	name: "Charge",
	description: "Sprint towards the enemy catching them off guard with a chance to stun.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZMHqP01D8-tN-uBn5s?alt=media&token=38cb6db9-89a4-485b-b439-9dd9373a43ec",
	pool: "barbarian",
	category: "attack",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
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
									type: "applyStatus",
									target: "enemy",
									statusId: "stunned",
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
					multiplier: 1.88,
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "stunned",
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
					multiplier: 2.25,
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "stunned",
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
