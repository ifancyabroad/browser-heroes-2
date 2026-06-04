import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description:
		"Temporarily obscure your enemy’s vision, with a chance to cause their attacks to miss.",
	effects: [
		{
			difficulty: 17,
			duration: 8,
			effect: "blind",
			modifier: "intelligence",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI69Ynmtt7mlCy4Zmvt?alt=media&token=2a821a50-422e-4e9a-b94d-1c4d5ca41f7d",
	level: 1,
	maxUses: 8,
	name: "Blind",
	price: 0,
	id: "blind",
});
