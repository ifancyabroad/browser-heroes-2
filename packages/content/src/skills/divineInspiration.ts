import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description:
		"Receive a surge of divine power, greatly enhancing strength, dexterity, and constitution to improve your combat abilities.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "strength",
					type: "stat",
					value: 8,
				},
				{
					name: "dexterity",
					type: "stat",
					value: 8,
				},
				{
					name: "constitution",
					type: "stat",
					value: 8,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTXdELX-HExDeZ8y6L?alt=media&token=b51b7b94-f31d-4c63-8282-a5c8adc911a1",
	level: 4,
	maxUses: 6,
	name: "Divine Inspiration",
	price: 0,
	id: "divine_inspiration",
});
