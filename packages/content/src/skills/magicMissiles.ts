import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "magic_missiles",
	name: "Magic Missiles",
	description: "Summon three piercing projectiles to launch at the enemy.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3yZ_5d4QQI4y90Inu?alt=media&token=494feabb-a251-4b55-afb0-0194a5b4000a",
	pool: "mage",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 7,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d6",
					attribute: "intelligence",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d6",
					attribute: "intelligence",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d6",
					attribute: "intelligence",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d6-2",
					attribute: "intelligence",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d6-2",
					attribute: "intelligence",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d6-2",
					attribute: "intelligence",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d6",
					attribute: "intelligence",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d6",
					attribute: "intelligence",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d6",
					attribute: "intelligence",
				},
			],
		},
	],
	tags: [],
});
