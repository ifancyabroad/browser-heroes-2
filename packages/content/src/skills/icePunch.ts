import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ice_punch",
	name: "Ice Punch",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJp6wp3bVLggUSeffg?alt=media&token=ce450c96-e4f7-4181-bf0f-62c1eb67d2be",
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
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d12+8",
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
					damageType: "cold",
					dice: "2d12+7",
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
					damageType: "cold",
					dice: "2d12+14",
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
	tags: [],
});
