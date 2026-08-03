import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_cold_wand",
	name: "Cold Wand",
	basePrice: 100,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "cold",
		attribute: "intelligence",
	},
	iconPool: [
		"items/weapons/wands/Wand_v2_02.png",
		"items/weapons/wands/Wand_v2_15.png",
		"items/weapons/wands/Wand_v2_22.png",
	],
	tags: [],
});
