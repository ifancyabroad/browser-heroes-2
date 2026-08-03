import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_half_plate",
	name: "Half Plate",
	basePrice: 160,
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 17,
	iconPool: [
		"items/armour/chest/Chest_45.png",
		"items/armour/chest/Chest_46_warchief.png",
		"items/armour/chest/Chest_47.png",
		"items/armour/chest/Chest_81.png",
		"items/armour/chest/Chest_82.png",
	],
	tags: [],
});
