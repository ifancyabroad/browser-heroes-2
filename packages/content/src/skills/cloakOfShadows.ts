import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description: "Shroud yourself in dark energy, enhancing resistance to elemental attacks.",
	effects: [
		{
			accuracy: 100,
			duration: 5,
			properties: [
				{
					name: "fire",
					type: "resistance",
					value: 75,
				},
				{
					name: "cold",
					type: "resistance",
					value: 75,
				},
				{
					name: "lightning",
					type: "resistance",
					value: 75,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqdUiFhyxCULAsWYJl?alt=media&token=ab345aab-5ea3-49ef-81e8-ed3481946db6",
	level: 4,
	maxUses: 3,
	name: "Cloak Of Shadows",
	price: 1300,
	id: "cloak_of_shadows",
});
