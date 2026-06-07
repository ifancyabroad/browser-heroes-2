import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_strike",
	name: "Fire Strike",
	description: "Infuse your attack with searing flames to scorch your target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NKt0W8prsXi7-54nBVz?alt=media&token=20861d4d-7243-4d77-84b4-9d5a0a5f986a",
	pool: "barbarian",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 7,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d10+5",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d10+4",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d10+9",
				},
			],
		},
	],
	tags: [],
});
