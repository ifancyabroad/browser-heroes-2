import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_padded_armour",
	name: "Padded Armour",
	basePrice: 40,
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 10,
	iconPool: [
		"items/armour/chest/Chest_01_farmer.png",
		"items/armour/chest/Chest_02_merchant.png",
		"items/armour/chest/Chest_03_farmer.png",
		"items/armour/chest/Chest_04_farmer.png",
		"items/armour/chest/Chest_05_citizen.png",
		"items/armour/chest/Chest_06_citizen.png",
	],
	tags: [],
});
