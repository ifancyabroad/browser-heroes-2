import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "reinforced",
	name: "Reinforced",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["armour"],
	},
	modifiers: [
		{
			type: "modifyDamageTaken",
			operation: "add",
			value: -1,
		},
	],
});
