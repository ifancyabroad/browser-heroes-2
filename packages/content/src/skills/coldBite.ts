import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cold_bite",
	name: "Cold Bite",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eOvYZWqjCOQtT8moN?alt=media&token=dd7a00ee-354d-42bb-b663-12671198f43f",
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
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d10+5",
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
					damageType: "cold",
					dice: "2d10+4",
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
					damageType: "cold",
					dice: "2d10+9",
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
