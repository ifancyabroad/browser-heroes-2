import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_protection",
	name: "of Protection",
	position: "suffix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["armour"],
		armourSlots: ["body", "shield"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
	],
});
