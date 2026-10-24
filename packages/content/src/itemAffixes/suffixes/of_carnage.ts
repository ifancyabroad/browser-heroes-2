import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_carnage",
	name: "of Carnage",
	position: "suffix",
	rarity: "epic",
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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 2,
		},
	],
});
