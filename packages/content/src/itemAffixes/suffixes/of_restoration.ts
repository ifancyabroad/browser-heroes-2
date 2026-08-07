import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_restoration",
	name: "of Restoration",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["mace", "staff"],
		},
		{ itemTypes: ["armour"], armourSlots: ["gloves", "belt", "amulet", "ring"] },
		{ itemTypes: ["armour"], armourSlots: ["body"], armourCategories: ["cloth"] },
	],
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.4,
		},
	],
});
