import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_fortitude",
	name: "of Fortitude",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 1,
		},
	],
	tags: [],
});
