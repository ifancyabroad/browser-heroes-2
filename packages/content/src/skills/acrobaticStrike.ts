import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acrobatic_strike",
	name: "Acrobatic Strike",
	description: "Strike the enemy from above as you leap over them in an attempt to get behind.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqZdRYK5clYyJxqQKi?alt=media&token=7529994a-db1d-47e4-8a6f-b1b517e85d8c",
	pool: "assassin",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 2,
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
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 1,
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
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 2,
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
					type: "applyStatus",
					target: "self",
					statusId: "critChance_auxiliaryStat_up",
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
