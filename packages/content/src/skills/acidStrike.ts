import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_strike",
	name: "Acid Strike",
	description: "Infuse your attack with corrosive acid, eating away at flesh.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh0aZeozWw6_HWDH23?alt=media&token=7b30ca2b-4a56-43db-a5b2-ce88c87c7fa2",
	pool: "rogue",
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
					damageType: "acid",
					dice: "1d8",
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
					damageType: "acid",
					dice: "2d8-2",
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
					damageType: "acid",
					dice: "2d8",
				},
			],
		},
	],
	tags: [],
});
