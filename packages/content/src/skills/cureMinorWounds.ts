import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_minor_wounds",
	name: "Cure Minor Wounds",
	description: "Restore a small amount of health to aid in recovery from minor injuries.",
	icon: "skills/cleric/cure_minor_wounds.png",
	pool: "cleric",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "1d8+3",
			attribute: "wisdom",
		},
	],
	tags: [],
});
