import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Fuse with elements, amplifying prowess in elemental warfare.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "cold",
					type: "damage",
					value: 50,
				},
				{
					name: "fire",
					type: "damage",
					value: 50,
				},
				{
					name: "lightning",
					type: "damage",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh3D7-ihgBpi0AbfB5?alt=media&token=7a3eb5c6-1571-4e5d-8945-9efb3875f991",
	level: 2,
	maxUses: 4,
	name: "Embrace Elements",
	price: 0,
	id: "embrace_elements",
});
