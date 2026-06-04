import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description:
		"Unleash a blinding burst of radiant energy, dealing significant damage with a chance to blind your enemies.",
	effects: [
		{
			damageType: "radiant",
			max: 30,
			min: 12,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 4,
			effect: "blind",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkT3OrPY0IOvzISeE0?alt=media&token=6642aefd-0e9d-4f0e-8b7e-d647a3873692",
	level: 4,
	maxUses: 2,
	name: "Sunburst",
	price: 0,
	id: "sunburst",
});
