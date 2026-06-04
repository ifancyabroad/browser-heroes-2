import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "cold",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 2,
			effect: "bleed",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAcJx5Xs5BJproNtWrj?alt=media&token=f042f62d-bcbb-4606-9a9a-fa979d37b271",
	level: 3,
	maxUses: 5,
	name: "Shark Bite",
	price: 0,
	id: "shark_bite",
});
