import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_annihilation",
	name: "of Annihilation",
	position: "suffix",
	rarity: "epic",
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyDamage",
			operation: "add",
			value: 2,
		},
	],
});
