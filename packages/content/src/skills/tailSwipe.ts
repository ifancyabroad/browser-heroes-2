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
			difficulty: 14,
			duration: 1,
			effect: "stun",
			modifier: "dexterity",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTlKRQQ38mTQ-94KcL?alt=media&token=d8d65416-95b7-49f8-af11-e087261f419b",
	level: 3,
	maxUses: 7,
	name: "Tail Swipe",
	price: 0,
	id: "tail_swipe",
});
