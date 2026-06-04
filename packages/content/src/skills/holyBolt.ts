import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Fire a burst of radiant energy that sears enemies with divine power.",
	effects: [
		{
			damageType: "radiant",
			max: 10,
			min: 1,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRbewhOgSp1zw1Uu7?alt=media&token=dca7c698-b44a-4c75-932c-b2291934e4cf",
	level: 1,
	maxUses: 12,
	name: "Holy Bolt",
	price: 0,
	id: "holy_bolt",
});
