import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description:
		"Heal the most severe injuries, restoring a substantial amount of health in a critical moment.",
	effects: [
		{
			max: 40,
			min: 16,
			modifier: "wisdom",
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTXoshOPa5Fo9AGlh2?alt=media&token=10c7904c-62ec-42d7-bb36-97ba9f9007cd",
	level: 4,
	maxUses: 1,
	name: "Cure Critical Wounds",
	price: 0,
	id: "cure_critical_wounds",
});
