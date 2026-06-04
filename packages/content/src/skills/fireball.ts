import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Conjure a ball of fire.",
	effects: [
		{
			damageType: "fire",
			max: 20,
			min: 8,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 18,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "fire",
					type: "resistance",
					value: -25,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc4-UVARP8jFmsiuXC9?alt=media&token=07349932-ea92-4da5-abf5-892cb4b16ba4",
	level: 3,
	maxUses: 4,
	name: "Fireball",
	price: 1000,
	id: "fireball",
});
