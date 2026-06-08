import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ice_punch",
	name: "Ice Punch",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJp6wp3bVLggUSeffg?alt=media&token=ce450c96-e4f7-4181-bf0f-62c1eb67d2be",
	pool: "common",
	category: "attack",
	maxUses: 6,
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
									damageType: "cold",
									dice: "1d12+8",
									requiresAttackRoll: true,
								},
								{
									type: "modifyStat",
									target: "enemy",
									stat: "dexterity",
									operation: "add",
									value: -4,
									durationTurns: 2,
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
									damageType: "cold",
									dice: "2d12+7",
									requiresAttackRoll: true,
								},
								{
									type: "modifyStat",
									target: "enemy",
									stat: "dexterity",
									operation: "add",
									value: -6,
									durationTurns: 3,
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
									damageType: "cold",
									dice: "2d12+14",
									requiresAttackRoll: true,
								},
								{
									type: "modifyStat",
									target: "enemy",
									stat: "dexterity",
									operation: "add",
									value: -8,
									durationTurns: 4,
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
