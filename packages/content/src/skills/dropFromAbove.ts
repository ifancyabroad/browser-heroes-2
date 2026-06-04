import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 16,
			duration: 1,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4o-B22zajLRPINRfV?alt=media&token=35e3da97-d73c-4b4f-982c-30174dabdb12",
	level: 3,
	maxUses: 1,
	name: "Drop from Above",
	price: 0,
	id: "drop_from_above",
});
