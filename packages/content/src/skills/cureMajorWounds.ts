import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Restore a significant amount of health, healing even the most grievous injuries.",
	effects: [
		{
			max: 30,
			min: 12,
			modifier: "wisdom",
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTUQdooGB1fZa6Q-pv?alt=media&token=98005b9d-49d9-4a20-a366-91a1d99852c5",
	level: 3,
	maxUses: 2,
	name: "Cure Major Wounds",
	price: 0,
	id: "cure_major_wounds",
});
