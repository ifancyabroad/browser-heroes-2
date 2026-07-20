import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "masterful",
	name: "Masterful",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "proficiencyBonus",
			operation: "add",
			value: 2,
		},
	],
});
