import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "skilled",
	name: "Skilled",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "proficiencyBonus",
			operation: "add",
			value: 1,
		},
	],
});
