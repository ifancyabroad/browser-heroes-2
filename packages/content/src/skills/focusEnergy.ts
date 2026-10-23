import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "focus_energy",
	name: "Focus Energy",
	description: "Gain advantage on attack rolls and expand your critical hit range.",
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
			value: 2,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
