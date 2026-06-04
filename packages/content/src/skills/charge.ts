import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "Sprint towards the enemy catching them off guard with a chance to stun.",
	effects: [
		{
			multiplier: 1.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			accuracy: 50,
			difficulty: 10,
			duration: 1,
			effect: "stun",
			modifier: "strength",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZMHqP01D8-tN-uBn5s?alt=media&token=38cb6db9-89a4-485b-b439-9dd9373a43ec",
	level: 1,
	maxUses: 1,
	name: "Charge",
	price: 200,
	target: "enemy",
	id: "charge",
});
