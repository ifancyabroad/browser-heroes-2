import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_evasion",
	name: "of Evasion",
	position: "suffix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["armour"],
		armourSlots: ["gloves", "boots"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
	],
});
