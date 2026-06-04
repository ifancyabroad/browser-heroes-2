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
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-ZLfpyTIdcuVmZGSy?alt=media&token=68eee82d-a96d-4750-8144-5971456792f2",
	level: 2,
	maxUses: 2,
	name: "Burning Shot",
	price: 0,
	id: "burning_shot",
});
