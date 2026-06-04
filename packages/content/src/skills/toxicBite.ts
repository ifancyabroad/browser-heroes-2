import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "poison",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 14,
			duration: 6,
			effect: "poison",
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCiu-f5bl8zaJxDA2ji?alt=media&token=96da30c0-726e-4617-b0f7-cc2a6b62ac38",
	level: 3,
	maxUses: 4,
	name: "Toxic Bite",
	price: 0,
	id: "toxic_bite",
});
