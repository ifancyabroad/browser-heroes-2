import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_hide_armour",
	name: "Hide Armour",
	basePrice: 100,
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 13,
	iconPool: [
		"items/armour/chest/Chest_54.png",
		"items/armour/chest/Chest_55.png",
		"items/armour/chest/Chest_56_leather.png",
		"items/armour/chest/Chest_57.png",
		"items/armour/chest/Chest_58_leatherPlus.png",
		"items/armour/chest/Chest_59.png",
	],
	tags: [],
});
