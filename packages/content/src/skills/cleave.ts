import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cleave",
	name: "Cleave",
	description: "A powerful weapon swing that deals additional slashing damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NJLRtY1B4JdDuOGq2sd?alt=media&token=23f9149d-b849-48df-a3b7-bbbfe6bdc20a",
	pool: "barbarian",
	category: "attack",
	maxUses: 7,
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
									type: "damage",
									target: "enemy",
									damageType: "slashing",
									dice: "1d8",
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
									type: "damage",
									target: "enemy",
									damageType: "slashing",
									dice: "2d8-2",
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
									type: "damage",
									target: "enemy",
									damageType: "slashing",
									dice: "2d8",
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
