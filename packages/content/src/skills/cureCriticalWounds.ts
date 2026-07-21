import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_critical_wounds",
	name: "Cure Critical Wounds",
	description:
		"Heal the most severe injuries, restoring a substantial amount of health in a critical moment.",
	icon: "skills/cleric/cure_critical_wounds.png",
	pool: "cleric",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "2d12+15",
			attribute: "wisdom",
		},
	],
	tags: [],
});
