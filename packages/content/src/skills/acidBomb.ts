import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bomb",
	name: "Acid Bomb",
	description: "Throw a bomb of corrosive acid at the enemy.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqc6Kl781JP6QdXB-m?alt=media&token=f946c220-9eb8-446a-be8b-62798aec2e29",
	pool: "rogue",
	category: "spell",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d10+3",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "2d10+3",
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
					damageType: "fire",
					dice: "3d10+4",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "3d10+4",
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
					damageType: "fire",
					dice: "4d10+5",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					dice: "4d10+5",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
