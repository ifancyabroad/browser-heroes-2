import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "acid",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTmlFYyunJA4SqDKIX?alt=media&token=195bfdc0-a900-4a6e-ad26-a9bca0f2072d",
	level: 1,
	maxUses: 6,
	name: "Acid Bite",
	price: 0,
	id: "acid_bite",
});
