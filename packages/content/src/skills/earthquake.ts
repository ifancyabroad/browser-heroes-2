import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 40,
			min: 16,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 15,
			duration: 2,
			effect: "stun",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJgE_UIN33YF5ZKfZD?alt=media&token=0bfce70c-bd52-49fe-b68f-a2ca75852719",
	level: 4,
	maxUses: 1,
	name: "Earthquake",
	price: 0,
	id: "earthquake",
});
