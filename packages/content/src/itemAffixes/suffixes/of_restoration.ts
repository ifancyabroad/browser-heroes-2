import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_restoration",
	name: "of Restoration",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.3,
		},
	],
});
