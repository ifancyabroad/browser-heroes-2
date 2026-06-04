import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			multiplier: 0.5,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-KtM9y-zKPmVbOwsO?alt=media&token=fad213f7-bc3e-4374-8ab1-d50259c9899b",
	level: 2,
	maxUses: 2,
	name: "Multi Shot",
	price: 0,
	id: "multi_shot",
});
