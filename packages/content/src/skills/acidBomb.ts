import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Throw a bomb of corrosive acid at the enemy.",
	effects: [
		{
			damageType: "fire",
			max: 18,
			min: 10,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "acid",
			max: 18,
			min: 10,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqc6Kl781JP6QdXB-m?alt=media&token=f946c220-9eb8-446a-be8b-62798aec2e29",
	level: 3,
	maxUses: 4,
	name: "Acid Bomb",
	price: 600,
	id: "acid_bomb",
});
