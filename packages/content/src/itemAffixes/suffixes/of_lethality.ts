import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_lethality",
	name: "of Lethality",
	position: "suffix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 1,
		},
	],
});
