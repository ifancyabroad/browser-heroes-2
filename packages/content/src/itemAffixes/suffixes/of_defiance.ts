import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_defiance",
	name: "of Defiance",
	position: "suffix",
	rarity: "rare",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			operation: "add",
			value: 2,
		},
	],
});
