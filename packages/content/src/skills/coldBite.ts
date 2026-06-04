import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "cold",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eOvYZWqjCOQtT8moN?alt=media&token=dd7a00ee-354d-42bb-b663-12671198f43f",
	level: 3,
	maxUses: 4,
	name: "Cold Bite",
	price: 0,
	id: "cold_bite",
});
