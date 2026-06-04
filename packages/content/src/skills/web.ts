import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 14,
			duration: 4,
			modifier: "dexterity",
			properties: [
				{
					name: "dexterity",
					type: "stat",
					value: -8,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTOiesS7DlEfpA_jDR?alt=media&token=5141b1d2-6098-4490-9b6d-a6c56e24c8f3",
	level: 2,
	maxUses: 4,
	name: "Web",
	price: 0,
	id: "web",
});
