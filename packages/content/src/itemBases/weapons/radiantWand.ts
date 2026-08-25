import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_radiant_wand",
	name: "Radiant Wand",
	basePrice: 100,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d4",
		type: "radiant",
		damageClass: "magical",
		attribute: "wisdom",
	},
	iconPool: [
		"items/weapons/wands/Wand_v2_04.png",
		"items/weapons/wands/Wand_v2_13.png",
		"items/weapons/wands/Wand_v2_53.png",
	],
	tags: [],
});
