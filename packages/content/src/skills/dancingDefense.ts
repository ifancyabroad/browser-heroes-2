import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description:
		"Greatly increases defense and chance for a critical strike with rhythmic movement.",
	effects: [
		{
			accuracy: 100,
			duration: 3,
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 5,
				},
				{
					name: "critChance",
					type: "auxiliaryStat",
					value: 5,
				},
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 4,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqWi-RbH2vwtAawttY?alt=media&token=b906457e-c916-43b2-957d-036855d70eb9",
	level: 4,
	maxUses: 4,
	name: "Dancing Defense",
	price: 1090,
	id: "dancing_defense",
});
