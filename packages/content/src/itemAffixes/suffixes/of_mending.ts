import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_mending",
	name: "of Mending",
	position: "suffix",
	rarity: "rare",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.15,
		},
	],
});
