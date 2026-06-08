import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "maim",
	name: "Maim",
	description: "Strike with brutal force, causing bleeding and a chance to disarm your opponent.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh1jOIoeiE7yvBATmT?alt=media&token=dc543036-974a-4187-9dd1-c2a6fced5ef0",
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
					multiplier: 2,
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "weakened",
									durationTurns: 3,
								},
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "bleeding",
									durationTurns: 3,
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
					multiplier: 2.5,
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "weakened",
									durationTurns: 4,
								},
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "bleeding",
									durationTurns: 4,
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
					multiplier: 3,
					attackRiders: [
						{
							timing: "onHit",
							effects: [
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "weakened",
									durationTurns: 5,
								},
								{
									type: "applyStatus",
									target: "enemy",
									statusId: "bleeding",
									durationTurns: 5,
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
