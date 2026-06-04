import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 19,
			duration: 4,
			modifier: "wisdom",
			properties: [
				{
					name: "strength",
					type: "stat",
					value: -4,
				},
				{
					name: "dexterity",
					type: "stat",
					value: -4,
				},
				{
					name: "constitution",
					type: "stat",
					value: -4,
				},
				{
					name: "intelligence",
					type: "stat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJ8msAkFt_vFDtrW5T?alt=media&token=7928e940-5f79-4395-8961-55a901f83713",
	level: 4,
	maxUses: 1,
	name: "Horrifying Visage",
	price: 0,
	id: "horrifying_visage",
});
