import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dueling_stance",
	name: "Dueling Stance",
	description: "Adopt a defensive posture that improves armour at the cost of damage dealt.",
	icon: "skills/warrior/dueling_stance.png",
	pool: "warrior",
	kind: "technique",
	category: "defensive",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 8,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 0.75,
			durationTurns: 6,
		},
	],
	tags: [],
});
