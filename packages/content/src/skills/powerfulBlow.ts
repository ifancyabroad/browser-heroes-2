import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 2,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIBB22KHcvQGE6xUN7?alt=media&token=70828828-a2ed-43f7-b2b8-c4687df8a467",
	level: 3,
	maxUses: 2,
	name: "Powerful Blow",
	price: 0,
	id: "powerful_blow",
});
