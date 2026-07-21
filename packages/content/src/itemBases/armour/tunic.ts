import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_tunic",
	name: "Tunic",
	basePrice: 60,
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	iconPool: [
		"items/armour/chest/Chest_22.png",
		"items/armour/chest/Chest_30_trader.png",
		"items/armour/chest/Chest_73.png",
		"items/armour/chest/Chest_74.png",
		"items/armour/chest/Chest_75.png",
		"items/armour/chest/Chest_76.png",
		"items/armour/chest/Chest_78.png",
		"items/armour/chest/Chest_79_adventure.png",
		"items/armour/chest/Chest_80.png",
	],
	tags: [],
});
