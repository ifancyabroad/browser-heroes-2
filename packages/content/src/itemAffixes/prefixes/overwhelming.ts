import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "overwhelming",
	name: "Overwhelming",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			operation: "add",
			value: 4,
		},
	],
});
