import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Prepare to attack with great speed, increasing critical strike chance.",
	icon: "skills/rogue/quick_fingers.png",
	pool: "rogue",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 1,
			durationTurns: 8,
		},
	],
	tags: [],
});
