import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 5,
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: 50,
				},
				{
					name: "crushing",
					type: "resistance",
					value: 50,
				},
				{
					name: "piercing",
					type: "resistance",
					value: 50,
				},
				{
					name: "fire",
					type: "resistance",
					value: 50,
				},
				{
					name: "lightning",
					type: "resistance",
					value: 50,
				},
				{
					name: "cold",
					type: "resistance",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-vWqkvavpvmdVpJ3W?alt=media&token=d94590dc-7adb-4cbf-af97-3b0825499b18",
	level: 3,
	maxUses: 1,
	name: "Blessing of the Old Gods",
	price: 0,
	id: "blessing_of_the_old_gods",
});
