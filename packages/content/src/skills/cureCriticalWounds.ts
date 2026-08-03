import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_critical_wounds",
	name: "Cure Critical Wounds",
	description:
		"Heal the most severe injuries, restoring a substantial amount of health in a critical moment.",
	icon: "skills/cleric/cure_critical_wounds.png",
	pool: "cleric",
	kind: "prayer",
	category: "heal",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "8d10",
			attribute: "wisdom",
		},
	],
	tags: [],
});
