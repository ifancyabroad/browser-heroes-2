import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 3,
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 5,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGS9HEr6Mb0wEKjYLh?alt=media&token=a0a2a938-e0a7-4952-96f9-957691195c98",
	level: 2,
	maxUses: 6,
	name: "Acquire Target",
	price: 0,
	id: "acquire_target",
});
