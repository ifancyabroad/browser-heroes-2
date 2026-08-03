import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_vigor",
	name: "of Vigor",
	position: "suffix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 5,
		},
	],
});
