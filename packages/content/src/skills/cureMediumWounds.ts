import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_medium_wounds",
	name: "Cure Medium Wounds",
	description: "Heal a moderate amount of health, mending more serious injuries.",
	icon: "skills/cleric/cure_medium_wounds.png",
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
