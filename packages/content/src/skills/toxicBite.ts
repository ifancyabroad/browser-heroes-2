import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "toxic_bite",
	name: "Toxic Bite",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCiu-f5bl8zaJxDA2ji?alt=media&token=96da30c0-726e-4617-b0f7-cc2a6b62ac38",
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
					damageType: "poison",
					dice: "1d10+5",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 6,
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
					damageType: "poison",
					dice: "2d10+4",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 7,
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
					damageType: "poison",
					dice: "2d10+9",
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "poison",
					durationTurns: 8,
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
