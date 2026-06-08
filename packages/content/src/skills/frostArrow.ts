import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_arrow",
	name: "Frost Arrow",
	description: "Conjure a frost arrow.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3xGd_-Cawo2Zo0ipP?alt=media&token=4890dfe4-70f3-459d-b6f1-bce3c3ab7daf",
	pool: "mage",
	category: "spell",
	maxUses: 12,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d10",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "2d10-3",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "2d10-1",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
