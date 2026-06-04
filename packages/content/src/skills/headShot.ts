import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			multiplier: 1.5,
			target: "enemy",
			type: "weaponDamage",
		},
		{
			difficulty: 10,
			duration: 1,
			effect: "stun",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-oBijY_YCkiGfM-gy?alt=media&token=a1746dee-7220-407d-9024-e8ec49f9121f",
	level: 3,
	maxUses: 1,
	name: "Head Shot",
	price: 0,
	id: "head_shot",
});
