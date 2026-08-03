import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_ferocity",
	name: "of Ferocity",
	position: "suffix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyDamage",
			operation: "add",
			value: 1,
		},
	],
});
