import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "Channel your concentration to sharpen precision and increase hit accuracy.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: 6,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgpG6pLRAqTW1AU0Eg?alt=media&token=049464de-0935-4c27-9f76-c3be3474a194",
	level: 2,
	maxUses: 6,
	name: "Focus Energy",
	price: 0,
	id: "focus_energy",
});
