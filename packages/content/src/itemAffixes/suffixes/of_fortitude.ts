import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_fortitude",
	name: "of Fortitude",
	position: "suffix",
	rarity: "common",
	minLevel: 1,
	weight: 1,
	appliesTo: {
		itemTypes: ["armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
