import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_alacrity",
	name: "of Alacrity",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "initiative",
			value: 3,
		},
	],
});
