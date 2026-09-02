import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_plate_armour",
	name: "Plate Armour",
	basePrice: 280,
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 18,
	iconPool: [
		"items/armour/chest/Chest_69.png",
		"items/armour/chest/Chest_70.png",
		"items/armour/chest/Chest_71_knight.png",
		"items/armour/chest/Cuirass.png",
	],
	tags: [],
});
