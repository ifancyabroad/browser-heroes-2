import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Swiftly dodge incoming attacks, greatly reducing the chance of being hit.",
	effects: [
		{
			duration: 3,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 10,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh-SuuVlmZIYSG87sp?alt=media&token=50aaef62-ac5c-4a23-8360-e7e26095a333",
	level: 3,
	maxUses: 3,
	name: "Evasion",
	price: 0,
	id: "evasion",
});
