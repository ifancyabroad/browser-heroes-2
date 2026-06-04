import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "crushing",
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 4,
			modifier: "strength",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC0KVp8uW27MHyrOLUj?alt=media&token=d7857ebc-fff4-4729-a859-0b359f9af9ea",
	level: 3,
	maxUses: 5,
	name: "Constrict",
	price: 0,
	id: "constrict",
});
