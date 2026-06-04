import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "strength",
					type: "stat",
					value: 4,
				},
				{
					name: "dexterity",
					type: "stat",
					value: 4,
				},
				{
					name: "constitution",
					type: "stat",
					value: 4,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9__YsYeJoI_hGpg6Ba?alt=media&token=9df26944-5d84-4818-a6eb-1284025422dc",
	level: 3,
	maxUses: 1,
	name: "Call Upon Rit Chi",
	price: 0,
	id: "call_upon_rit_chi",
});
