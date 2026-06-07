import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "powerful_blow",
	name: "Powerful Blow",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIBB22KHcvQGE6xUN7?alt=media&token=70828828-a2ed-43f7-b2b8-c4687df8a467",
	pool: "common",
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
