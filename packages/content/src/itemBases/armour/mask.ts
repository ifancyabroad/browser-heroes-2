import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_mask",
	name: "Mask",
	basePrice: 20,
	type: "armour",
	slot: "helmet",
	iconPool: [
		"items/armour/helms/Helm_17.png",
		"items/armour/helms/Helm_33.png",
		"items/armour/helms/Helm_34_Mask.png",
		"items/armour/helms/Helm_35_mask.png",
		"items/armour/helms/Helm_36_mask.png",
	],
	tags: [],
});
