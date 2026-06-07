import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_arrow",
	name: "Flame Arrow",
	description: "Conjure a flame arrow.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3vvlL3y_va4dkw6_B?alt=media&token=93233ba3-b47e-48c4-9978-1bc145f4a2cb",
	pool: "warlock",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 12,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d10",
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
					damageType: "fire",
					dice: "2d10-3",
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
					damageType: "fire",
					dice: "2d10-1",
					attribute: "intelligence",
				},
			],
		},
	],
	tags: [],
});
