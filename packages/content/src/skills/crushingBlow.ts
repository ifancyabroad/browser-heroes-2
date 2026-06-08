import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_blow",
	name: "Crushing Blow",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-ODAw3gDINrvjsnEE52L?alt=media&token=583e5483-a891-4f18-a897-0bc2f4781577",
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
									damageType: "crushing",
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
									damageType: "crushing",
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
									damageType: "crushing",
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
