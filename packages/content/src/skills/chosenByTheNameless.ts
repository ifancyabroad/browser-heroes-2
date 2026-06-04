import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "wisdom",
					type: "stat",
					value: 8,
				},
				{
					name: "constitution",
					type: "stat",
					value: 8,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIzZAWoMILIUtWYjFz?alt=media&token=f1801eb6-8e78-4236-8901-428e63164c4e",
	level: 4,
	maxUses: 1,
	name: "Chosen by the Nameless",
	price: 0,
	id: "chosen_by_the_nameless",
});
