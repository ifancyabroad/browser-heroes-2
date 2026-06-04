import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Conjure a flame arrow.",
	effects: [
		{
			damageType: "fire",
			max: 10,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3vvlL3y_va4dkw6_B?alt=media&token=93233ba3-b47e-48c4-9978-1bc145f4a2cb",
	level: 1,
	maxUses: 12,
	name: "Flame Arrow",
	price: 60,
	id: "flame_arrow",
});
