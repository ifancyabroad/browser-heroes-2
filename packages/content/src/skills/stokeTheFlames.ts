import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 4,
			properties: [
				{
					name: "fire",
					type: "damage",
					value: 40,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OA7zdXDv3eGxenwra8y?alt=media&token=d0758678-8c24-457e-a357-e3c3221df9d5",
	level: 2,
	maxUses: 1,
	name: "Stoke the Flames",
	price: 0,
	id: "stoke_the_flames",
});
