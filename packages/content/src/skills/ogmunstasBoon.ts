import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ogmunstas_boon",
	name: "Og'Munsta's Boon",
	description:
		"Expand your critical hit range and increase your critical hit damage dice multiplier for the current battle.",
	icon: "skills/unique/ogmunstas_boon.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalRangeBonus",
			value: 10,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalDiceMultiplierBonus",
			value: 2,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
