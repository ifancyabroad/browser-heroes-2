import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_medium_wounds",
	name: "Cure Medium Wounds",
	description: "Heal a moderate amount of health, mending more serious injuries.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRk0hkXBsKEHMEWD2?alt=media&token=5601f4d5-0951-42a2-b8bc-b41b17629772",
	pool: "cleric",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "1d12+8",
			attribute: "wisdom",
		},
	],
	tags: [],
});
