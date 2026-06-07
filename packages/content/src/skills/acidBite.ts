import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bite",
	name: "Acid Bite",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTmlFYyunJA4SqDKIX?alt=media&token=195bfdc0-a900-4a6e-ad26-a9bca0f2072d",
	pool: "common",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 6,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "1d6-1",
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
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "2d6-3",
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
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "2d6-2",
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
