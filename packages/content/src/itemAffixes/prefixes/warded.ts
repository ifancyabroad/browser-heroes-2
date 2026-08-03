import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "warded",
	name: "Warded",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["armour"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageTaken",
			operation: "multiply",
			value: 0.9,
		},
	],
});
