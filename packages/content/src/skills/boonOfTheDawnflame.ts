import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "radiant",
					type: "damage",
					value: 50,
				},
				{
					name: "fire",
					type: "damage",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCKBZQcW3cNIj2iVasE?alt=media&token=fe75ce58-2614-435f-915d-12a869debee7",
	level: 4,
	maxUses: 1,
	name: "Boon of the Dawnflame",
	price: 0,
	id: "boon_of_the_dawnflame",
});
