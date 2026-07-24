import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "potent",
	name: "Potent",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 2,
		},
	],
});
