import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			difficulty: 12,
			duration: 1,
			effect: "stun",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "piercing",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eSRJIY86RZLdUWrd8?alt=media&token=dd7c5e27-3d52-4755-b538-5c7c5b4bb164",
	level: 2,
	maxUses: 1,
	name: "Minotaur Charge",
	price: 0,
	id: "minotaur_charge",
});
