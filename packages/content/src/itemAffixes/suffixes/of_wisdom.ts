import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_wisdom",
	name: "of Wisdom",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
