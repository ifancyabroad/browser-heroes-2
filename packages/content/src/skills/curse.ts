import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Inflict a debilitating curse that forces the enemy to fail all saving throws, leaving them vulnerable.",
	effects: [
		{
			duration: 6,
			effect: "curse",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkGRRiaTZa0Q2JeWOd?alt=media&token=3cc333c5-9195-4969-9a08-eb4ab974bc34",
	level: 1,
	maxUses: 8,
	name: "Curse",
	price: 0,
	id: "curse",
});
