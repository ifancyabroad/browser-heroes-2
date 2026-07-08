import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_rampage",
	name: "Burning Rampage",
	description:
		"Unleash the flames within and ignite your enemies with this powerful fire attack.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZMJ9LGQM22pDRl_EYc?alt=media&token=4ea45e0b-68b0-4d8c-aaa2-c40d339d7682",
	pool: "barbarian",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d6-1",
			attribute: "strength",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d6-1",
			attribute: "strength",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d6-1",
			attribute: "strength",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
