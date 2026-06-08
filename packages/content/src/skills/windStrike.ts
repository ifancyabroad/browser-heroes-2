import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wind_strike",
	name: "Wind Strike",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4aGSePG9PEzPMvMY-?alt=media&token=f04e8fec-7606-46c7-ad08-2c97af064b3e",
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
									type: "damage",
									target: "enemy",
									damageType: "lightning",
									dice: "1d12+8",
									requiresAttackRoll: true,
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
									damageType: "lightning",
									dice: "2d12+7",
									requiresAttackRoll: true,
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
									damageType: "lightning",
									dice: "2d12+14",
									requiresAttackRoll: true,
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
