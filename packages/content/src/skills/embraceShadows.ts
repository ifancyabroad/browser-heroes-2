import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Imbue yourself with necrotic energy to improve spell power.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "necrotic",
					type: "damage",
					value: 80,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh4hPWuWx_NN1YApGU?alt=media&token=deb4a7d0-86c8-4750-afea-79b9730efece",
	level: 2,
	maxUses: 4,
	name: "Embrace Shadows",
	price: 0,
	id: "embrace_shadows",
});
