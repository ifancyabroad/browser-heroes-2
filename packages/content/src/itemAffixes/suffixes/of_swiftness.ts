import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_swiftness",
	name: "of Swiftness",
	position: "suffix",
	rarity: "rare",
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
			value: 2,
		},
	],
});
