import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Unleash divine retribution, smiting foes with holy power.",
	effects: [
		{
			multiplier: 1,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			damageType: "radiant",
			max: 8,
			min: 1,
			modifier: "",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkP4BW6tSXQG6EoCJq?alt=media&token=1cc90227-b3e3-4e44-bd0c-c35455a2cc97",
	level: 1,
	maxUses: 7,
	name: "Holy Strike",
	price: 0,
	id: "holy_strike",
});
