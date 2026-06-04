import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description:
		"Unleash the flames within and ignite your enemies with this powerful fire attack.",
	effects: [
		{
			damageType: "fire",
			max: 4,
			min: 1,
			modifier: "strength",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 4,
			min: 1,
			modifier: "strength",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 4,
			min: 1,
			modifier: "strength",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZMJ9LGQM22pDRl_EYc?alt=media&token=4ea45e0b-68b0-4d8c-aaa2-c40d339d7682",
	level: 2,
	maxUses: 5,
	name: "Burning Rampage",
	price: 420,
	target: "enemy",
	id: "burning_rampage",
});
