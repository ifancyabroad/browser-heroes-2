import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "impervious",
	name: "Impervious",
	position: "prefix",
	rarity: "epic",
	weight: 0.75,
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["body", "shield"],
		},
	],
	modifiers: [
		{
			type: "modifyDamageTaken",
			operation: "multiply",
			value: 0.8,
		},
	],
});
