import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "lightning",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJhiIp9tX3XVE1ycOM?alt=media&token=050dfca8-1aca-491b-9100-48ef6800be74",
	level: 4,
	maxUses: 2,
	name: "Cyclone",
	price: 0,
	id: "cyclone",
});
