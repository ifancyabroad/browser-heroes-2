import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "double_strike",
	name: "Double Strike",
	description: "Execute two rapid attacks in quick succession against a single target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTnzsxBYgTye5lFfkd?alt=media&token=51004322-ba78-44c5-9f60-332eefbdffec",
	pool: "warrior",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 3,
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
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
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
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
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
