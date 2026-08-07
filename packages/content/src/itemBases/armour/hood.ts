import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_hood",
	name: "Hood",
	basePrice: 70,
	type: "armour",
	slot: "helmet",
	iconPool: [
		"items/armour/helms/Helm_02.png",
		"items/armour/helms/Helm_03.png",
		"items/armour/helms/Helm_32.png",
		"items/armour/helms/Helm_39_inhabitant.png",
		"items/armour/helms/Helm_70_mage.png",
		"items/armour/helms/Helm_71_green.png",
		"items/armour/helms/Helm_72.png",
	],
	tags: [],
});
