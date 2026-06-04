import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Reduce the opponents magic resistance.",
	effects: [
		{
			accuracy: 100,
			difficulty: 20,
			duration: 6,
			modifier: "intelligence",
			properties: [
				{
					name: "cold",
					type: "resistance",
					value: -50,
				},
				{
					name: "fire",
					type: "resistance",
					value: -50,
				},
				{
					name: "lightning",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc404KHFQ3zZaHpCbe2?alt=media&token=b2a650c7-b8ae-4b7a-93e7-fb8f090a1e85",
	level: 3,
	maxUses: 4,
	name: "Pierce Magic",
	price: 950,
	id: "pierce_magic",
});
