import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Heal a moderate amount of health, mending more serious injuries.",
	effects: [
		{
			max: 20,
			min: 8,
			modifier: "wisdom",
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRk0hkXBsKEHMEWD2?alt=media&token=5601f4d5-0951-42a2-b8bc-b41b17629772",
	level: 2,
	maxUses: 2,
	name: "Cure Medium Wounds",
	price: 0,
	id: "cure_medium_wounds",
});
