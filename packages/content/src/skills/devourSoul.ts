import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 30,
			min: 12,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 6,
			modifier: "wisdom",
			properties: [
				{
					name: "constitution",
					type: "stat",
					value: -5,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC0IqVe3gyJes08fYye?alt=media&token=db556fe6-0ff7-44b9-9d74-d19d08057a0f",
	level: 3,
	maxUses: 2,
	name: "Devour Soul",
	price: 0,
	id: "devour_soul",
});
