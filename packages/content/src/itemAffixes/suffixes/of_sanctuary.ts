import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_sanctuary",
	name: "of Sanctuary",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["body", "shield"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 2,
		},
	],
});
