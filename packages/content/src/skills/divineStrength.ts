import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Infuse yourself with divine might, bolstering physical prowess.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "strength",
					type: "stat",
					value: 8,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkOF38JibaTuWhFGg_?alt=media&token=18908b64-c7c2-4581-b0b6-04b48c601aaf",
	level: 2,
	maxUses: 6,
	name: "Divine Strength",
	price: 0,
	id: "divine_strength",
});
