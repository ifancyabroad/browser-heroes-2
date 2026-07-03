import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_strike",
	name: "Poison Strike",
	description: "Coat your weapon with venom, delivering a toxic blow that poisons your target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgyxj9aTH40MK_MCPF?alt=media&token=ed4f5378-03ef-4011-9a54-01da6bb758f3",
	pool: "assassin",
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
									type: "damageOverTime",
									target: "enemy",
									damageType: "poison",
									dice: "1d4",
									durationTurns: 6,
								},
								{
									type: "damage",
									target: "enemy",
									damageType: "poison",
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
									type: "damageOverTime",
									target: "enemy",
									damageType: "poison",
									dice: "1d6",
									durationTurns: 7,
								},
								{
									type: "damage",
									target: "enemy",
									damageType: "poison",
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
									type: "damageOverTime",
									target: "enemy",
									damageType: "poison",
									dice: "1d8",
									durationTurns: 8,
								},
								{
									type: "damage",
									target: "enemy",
									damageType: "poison",
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
