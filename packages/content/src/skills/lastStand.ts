import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "last_stand",
	name: "Last Stand",
	description:
		"Summon your remaining strength to recover health and temporarily bolster your physical resilience.",
	icon: "skills/fighter/last_stand.png",
	pool: "fighter",
	kind: "technique",
	category: "heal",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "8d12",
			attribute: "constitution",
		},
		{
			type: "shield",
			target: "self",
			amount: 20,
			duration: { unit: "turns", value: 2 },
		},
	],
	tags: [],
});
