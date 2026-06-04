import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 18,
			duration: 4,
			modifier: "dexterity",
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: -6,
				},
				{
					name: "critChance",
					type: "auxiliaryStat",
					value: -6,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJlQdMjqgglotq5k6C?alt=media&token=17097725-a9f6-4e57-a95e-9447d96a91d4",
	level: 3,
	maxUses: 3,
	name: "Creeping Darkness",
	price: 0,
	id: "creeping_darkness",
});
