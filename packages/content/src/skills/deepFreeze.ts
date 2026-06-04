import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description:
		"A concentrated frost spell that encases the target in solid ice, dealing damage and rendering them unable to act.",
	effects: [
		{
			damageType: "cold",
			max: 30,
			min: 12,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 2,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc43Ea3uk2s6Flfxpga?alt=media&token=595b97e4-435b-4750-a958-e1980de2946f",
	level: 4,
	maxUses: 2,
	name: "Deep Freeze",
	price: 1320,
	id: "deep_freeze",
});
