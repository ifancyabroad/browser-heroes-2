import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_mending",
	name: "of Mending",
	position: "suffix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["mace", "staff"],
		},
		{
			itemTypes: ["armour"],
			armourSlots: ["gloves", "belt", "amulet", "ring"],
		},
		{
			itemTypes: ["armour"],
			armourSlots: ["body"],
			armourCategories: ["cloth"],
		},
	],
	modifiers: [
		{
			type: "modifyHealing",
			multiplier: 1.25,
		},
	],
});
