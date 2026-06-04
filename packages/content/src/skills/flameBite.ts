import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "fire",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OFEZCfd9D55StQEZpFP?alt=media&token=215eafa2-0cf5-48b3-a9cd-350afcbf6ba2",
	level: 3,
	maxUses: 4,
	name: "Flame Bite",
	price: 0,
	id: "flame_bite",
});
