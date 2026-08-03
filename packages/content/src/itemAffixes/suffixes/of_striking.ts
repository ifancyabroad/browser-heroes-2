import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_striking",
	name: "of Striking",
	position: "suffix",
	rarity: "uncommon",
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
	],
});
