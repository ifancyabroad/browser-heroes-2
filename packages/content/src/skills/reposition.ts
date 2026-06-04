import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 3,
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9_cea1qIQBNQ3ncod_?alt=media&token=0b715183-560d-4152-a792-aba05400eff2",
	level: 3,
	maxUses: 4,
	name: "Reposition",
	price: 0,
	id: "reposition",
});
