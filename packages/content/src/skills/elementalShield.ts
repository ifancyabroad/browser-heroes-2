import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description:
		"Summon a protective barrier infused with elemental energy to guard against attacks.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "fire",
					type: "resistance",
					value: 40,
				},
				{
					name: "cold",
					type: "resistance",
					value: 40,
				},
				{
					name: "lightning",
					type: "resistance",
					value: 40,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCz3gjt9HaaTCJh2XIS?alt=media&token=32b231dd-9a2e-4b5d-997c-4647a8fcb717",
	level: 2,
	maxUses: 4,
	name: "Elemental Shield",
	price: 0,
	id: "elemental_shield",
});
