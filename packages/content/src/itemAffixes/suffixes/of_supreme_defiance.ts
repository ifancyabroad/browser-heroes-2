import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_supreme_defiance",
	name: "of Supreme Defiance",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
});
