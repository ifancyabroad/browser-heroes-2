import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_agility",
	name: "of Agility",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
