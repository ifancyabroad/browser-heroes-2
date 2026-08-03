import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_longsword",
	name: "Longsword",
	basePrice: 115,
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "slashing",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/swords/Sword_02.png",
		"items/weapons/swords/Sword_17.png",
		"items/weapons/swords/Sword_18.png",
		"items/weapons/swords/Sword_19.png",
		"items/weapons/swords/Sword_20.png",
		"items/weapons/swords/Sword_21.png",
		"items/weapons/swords/Sword_34.png",
		"items/weapons/swords/Sword_35.png",
		"items/weapons/swords/Sword_37.png",
		"items/weapons/swords/Sword_41.png",
		"items/weapons/swords/Sword_42.png",
		"items/weapons/swords/Sword_48.png",
		"items/weapons/swords/Sword_51.png",
		"items/weapons/swords/Sword_65.png",
	],
	tags: [],
});
