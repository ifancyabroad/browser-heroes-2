import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Speak a disorienting word that has a chance to charm or blind the enemy, leaving them confused and vulnerable.",
	effects: [
		{
			difficulty: 14,
			duration: 3,
			effect: "blind",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 10,
			duration: 3,
			effect: "charm",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6P21THAWT0E0VgnjP?alt=media&token=f59fa068-f3d0-47ed-91af-92b438cb3825",
	level: 3,
	maxUses: 2,
	name: "Power Word: Confusion",
	price: 0,
	id: "power_word_confusion",
});
