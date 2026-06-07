import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "backstab",
	name: "Backstab",
	description: "Sneak behind the enemy to strike them in the back.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqa_ZuZcAZCuzTr5c3?alt=media&token=e7f6ca07-6427-467d-9aef-21315491dd76",
	pool: "assassin",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 1,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 2,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 2.5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 3,
				},
			],
		},
	],
	tags: [],
});
