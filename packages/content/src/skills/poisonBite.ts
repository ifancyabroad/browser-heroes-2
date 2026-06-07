import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bite",
	name: "Poison Bite",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTOJ5N4B3V55HpTl-8?alt=media&token=9e866550-b99b-4c0f-b146-d98d34634113",
	pool: "common",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 4,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 5,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 6,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
				},
			],
		},
	],
	tags: [],
});
