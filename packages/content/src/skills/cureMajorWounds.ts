import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_major_wounds",
	name: "Cure Major Wounds",
	description: "Restore a significant amount of health, healing even the most grievous injuries.",
	icon: "skills/cleric/cure_major_wounds.png",
	pool: "cleric",
	kind: "prayer",
	category: "heal",
	maxUses: 3,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "7d6",
			attribute: "wisdom",
		},
	],
	tags: [],
});
