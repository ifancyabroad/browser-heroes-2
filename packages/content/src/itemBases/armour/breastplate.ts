import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_breastplate",
	name: "Breastplate",
	basePrice: 300,
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 16,
	iconPool: [
		"items/armour/chest/Chest_12.png",
		"items/armour/chest/Chest_13.png",
		"items/armour/chest/Chest_14_milita.png",
		"items/armour/chest/Chest_15.png",
		"items/armour/chest/Chest_16.png",
		"items/armour/chest/Chest_66.png",
	],
	tags: [],
});
