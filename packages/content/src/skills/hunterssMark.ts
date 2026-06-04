import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 4,
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
		{
			difficulty: 20,
			duration: 4,
			modifier: "dexterity",
			properties: [
				{
					name: "piercing",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCyGQhU_sx4-m68ZoQs?alt=media&token=28c9604f-8d09-4c21-afe1-ebc6b258c750",
	level: 3,
	maxUses: 2,
	name: "Hunters's Mark",
	price: 0,
	id: "hunterss_mark",
});
