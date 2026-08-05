import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "quick_fingers",
	name: "Quick Fingers",
	description: "Settle into a precise rhythm that greatly increases critical strike chance.",
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
