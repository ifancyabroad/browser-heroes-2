import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "last_stand",
	name: "Last Stand",
	description:
		"Summon your remaining strength to recover health and temporarily bolster your physical resilience.",
	icon: "skills/warrior/last_stand.png",
	pool: "warrior",
	kind: "technique",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "8d8+16",
			attribute: "constitution",
		},
		{
			type: "shield",
			target: "self",
			amount: 20,
			durationTurns: 2,
		},
	],
	tags: [],
});
