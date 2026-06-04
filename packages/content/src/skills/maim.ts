import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Strike with brutal force, causing bleeding and a chance to disarm your opponent.",
	effects: [
		{
			multiplier: 2,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			difficulty: 16,
			duration: 3,
			effect: "disarm",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 20,
			duration: 3,
			effect: "bleed",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh1jOIoeiE7yvBATmT?alt=media&token=dc543036-974a-4187-9dd1-c2a6fced5ef0",
	level: 4,
	maxUses: 2,
	name: "Maim",
	price: 0,
	id: "maim",
});
