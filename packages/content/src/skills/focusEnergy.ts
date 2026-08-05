import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "focus_energy",
	name: "Focus Energy",
	description:
		"Channel your concentration to sharpen accuracy and deliver deadlier critical hits.",
	icon: "skills/fighter/focus_energy.png",
	pool: "fighter",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 1,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
