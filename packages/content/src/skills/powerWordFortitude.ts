import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "constitution",
					type: "stat",
					value: 10,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUsnh4THCA3EXJQn2?alt=media&token=182ef9a7-eb29-4876-b743-e017a3694bda",
	level: 3,
	maxUses: 8,
	name: "Power Word: Fortitude",
	price: 0,
	id: "power_word_fortitude",
});
