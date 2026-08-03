import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "nimble",
	name: "Nimble",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
	],
});
