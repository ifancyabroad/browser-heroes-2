import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_strike",
	name: "Shadow Strike",
	description:
		"Deliver a swift strike imbued with shadowy energy, dealing necrotic damage to your target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUEy6k5HuRL-oXw1-y?alt=media&token=9d7cfcff-a684-443c-9009-3765ec600d9e",
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
									type: "damage",
									target: "enemy",
									damageType: "necrotic",
									dice: "1d8+3",
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
									damageType: "necrotic",
									dice: "2d8+1",
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
									damageType: "necrotic",
									dice: "2d8+4",
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
