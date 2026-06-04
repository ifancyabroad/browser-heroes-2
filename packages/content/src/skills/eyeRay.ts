import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 6,
			duration: 1,
			effect: "charm",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 8,
			duration: 1,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 10,
			duration: 1,
			effect: "blind",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3fgWvaJhBd1_Ar0AK?alt=media&token=31bbe6e1-3867-4a52-9b86-20209b2cae4f",
	level: 4,
	maxUses: 12,
	name: "Eye Ray",
	price: 0,
	id: "eye_ray",
});
