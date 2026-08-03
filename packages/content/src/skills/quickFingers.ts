import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Settle into a precise rhythm that greatly increases critical strike chance.",
	icon: "skills/rogue/quick_fingers.png",
	pool: "rogue",
	kind: "technique",
	category: "buff",
	maxUses: 5,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 5,
			durationTurns: 8,
		},
	],
	tags: [],
});
