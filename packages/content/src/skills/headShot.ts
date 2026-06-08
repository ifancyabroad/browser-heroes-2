import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "head_shot",
	name: "Head Shot",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-oBijY_YCkiGfM-gy?alt=media&token=a1746dee-7220-407d-9024-e8ec49f9121f",
	pool: "common",
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
