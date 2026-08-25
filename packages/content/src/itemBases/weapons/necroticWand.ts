import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_necrotic_wand",
	name: "Necrotic Wand",
	basePrice: 100,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d4",
		type: "necrotic",
		damageClass: "magical",
		attribute: "wisdom",
	},
	iconPool: [
		"items/weapons/wands/Wand_v2_08.png",
		"items/weapons/wands/Wand_v2_14.png",
		"items/weapons/wands/Wand_v2_34.png",
	],
	tags: [],
});
