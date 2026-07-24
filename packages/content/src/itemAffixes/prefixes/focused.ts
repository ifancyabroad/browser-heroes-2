import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "focused",
	name: "Focused",
	position: "prefix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 1,
		},
	],
});
