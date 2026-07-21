import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_fire_wand",
	name: "Fire Wand",
	basePrice: 60,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "fire",
		attribute: "intelligence",
	},
	iconPool: [
		"items/weapons/wands/Wand_v2_23.png",
		"items/weapons/wands/Wand_v2_24.png",
		"items/weapons/wands/Wand_v2_37.png",
	],
	tags: [],
});
