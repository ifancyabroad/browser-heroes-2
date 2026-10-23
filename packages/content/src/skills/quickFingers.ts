import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Expand your critical hit range for the current battle.",
	icon: "skills/thief/quick_fingers.png",
	pool: "thief",
	kind: "technique",
	category: "buff",
	rarity: "common",
	maxUses: 5,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
