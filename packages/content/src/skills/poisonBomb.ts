import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Throw a poisoned explosive at the enemy with a chance to poison them.",
	effects: [
		{
			damageType: "poison",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			accuracy: 50,
			difficulty: 19,
			duration: 4,
			effect: "poison",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqbgWmfMqnnjnXn-Hp?alt=media&token=7b653a63-5cb5-41f1-aafe-45beb0b53579",
	level: 1,
	maxUses: 6,
	name: "Poison Bomb",
	price: 760,
	id: "poison_bomb",
});
