import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Aim for the opponents eyes with a chance to temporarily blind them.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			difficulty: 19,
			duration: 1,
			effect: "blind",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqb8JkDlplkchg0htc?alt=media&token=d137cfde-7d00-42aa-b967-c97844037121",
	level: 2,
	maxUses: 4,
	name: "Go For The Eyes",
	price: 250,
	id: "go_for_the_eyes",
});
