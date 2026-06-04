import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "fire",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "fire",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9_bwdIr8BegxbOjPip?alt=media&token=9ac6a519-98ab-479d-9c80-e2d90fafb13a",
	level: 3,
	maxUses: 2,
	name: "Make it Rain",
	price: 0,
	id: "make_it_rain",
});
