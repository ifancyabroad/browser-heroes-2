import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description:
		"Summon your remaining strength to recover health and temporarily bolster your physical resilience.",
	effects: [
		{
			duration: 2,
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: 100,
				},
				{
					name: "crushing",
					type: "resistance",
					value: 100,
				},
				{
					name: "piercing",
					type: "resistance",
					value: 100,
				},
			],
			target: "self",
			type: "status",
		},
		{
			max: 70,
			min: 70,
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHm6ropyvvjWSACK2Gc?alt=media&token=19ebde6c-7a8f-45b6-b288-102706f7ffaf",
	level: 4,
	maxUses: 1,
	name: "Last Stand",
	price: 0,
	id: "last_stand",
});
