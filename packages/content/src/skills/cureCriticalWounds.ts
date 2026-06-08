import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_critical_wounds",
	name: "Cure Critical Wounds",
	description:
		"Heal the most severe injuries, restoring a substantial amount of health in a critical moment.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTXoshOPa5Fo9AGlh2?alt=media&token=10c7904c-62ec-42d7-bb36-97ba9f9007cd",
	pool: "cleric",
	category: "heal",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "2d12+15",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "3d12+21",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "4d12+27",
					attribute: "wisdom",
				},
			],
		},
	],
	tags: [],
});
