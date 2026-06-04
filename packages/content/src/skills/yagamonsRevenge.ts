import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 4,
			properties: [
				{
					name: "crushing",
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCZHaFOopyGcTKt8Pva?alt=media&token=b85e09f9-35c8-4273-9e7b-e1d481defdfe",
	level: 4,
	maxUses: 1,
	name: "Yagamon's Revenge",
	price: 0,
	id: "yagamons_revenge",
});
