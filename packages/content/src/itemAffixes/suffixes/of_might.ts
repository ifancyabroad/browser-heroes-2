import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_might",
	name: "of Might",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
