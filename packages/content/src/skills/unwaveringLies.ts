import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			difficulty: 21,
			duration: 3,
			modifier: "wisdom",
			properties: [
				{
					name: "necrotic",
					type: "resistance",
					value: -50,
				},
				{
					name: "intelligence",
					type: "stat",
					value: -5,
				},
				{
					name: "wisdom",
					type: "stat",
					value: -5,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC8_KrCSlLCSAitJUg6?alt=media&token=df0b551d-d289-423a-a18a-b0e85db738fc",
	level: 4,
	maxUses: 2,
	name: "Unwavering Lies",
	price: 0,
	id: "unwavering_lies",
});
