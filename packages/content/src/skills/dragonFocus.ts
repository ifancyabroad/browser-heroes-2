import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 8,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIBl5fB-L23FChaK9-?alt=media&token=6985ca0f-caca-4413-a468-376907ef7d01",
	level: 4,
	maxUses: 2,
	name: "Dragon Focus",
	price: 0,
	id: "dragon_focus",
});
