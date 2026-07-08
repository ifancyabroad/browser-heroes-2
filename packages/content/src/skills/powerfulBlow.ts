import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "powerful_blow",
	name: "Powerful Blow",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIBB22KHcvQGE6xUN7?alt=media&token=70828828-a2ed-43f7-b2b8-c4687df8a467",
	pool: "common",
	category: "attack",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [],
		},
	],
	tags: [],
});
