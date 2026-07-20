import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_resolve",
	name: "of Resolve",
	position: "suffix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			operation: "add",
			value: 1,
		},
	],
});
