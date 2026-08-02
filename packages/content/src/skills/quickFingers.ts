import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Exploit an opening with a swift strike, then maintain a deadly rhythm.",
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
			value: 1,
			durationTurns: 3,
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.75,
			attackRiders: [],
		},
	],
	tags: [],
});
