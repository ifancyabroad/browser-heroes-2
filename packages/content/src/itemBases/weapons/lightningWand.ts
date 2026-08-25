import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_lightning_wand",
	name: "Lightning Wand",
	basePrice: 100,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d4",
		type: "lightning",
		damageClass: "magical",
		attribute: "intelligence",
	},
	iconPool: [
		"items/weapons/wands/Wand_v2_21.png",
		"items/weapons/wands/Wand_v2_28.png",
		"items/weapons/wands/Wand_v2_32.png",
	],
	tags: [],
});
