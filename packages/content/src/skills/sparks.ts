import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sparks",
	name: "Sparks",
	description: "Shoot lightning from your fingers.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh50tlZXmwsJcskPE8?alt=media&token=f0c44bf4-c4c5-4cf2-b8d5-30203a07ecc6",
	pool: "mage",
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
					damageType: "lightning",
					dice: "1d8",
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
					damageType: "lightning",
					dice: "2d8-2",
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
					damageType: "lightning",
					dice: "2d8",
					attribute: "intelligence",
				},
			],
		},
	],
	tags: [],
});
