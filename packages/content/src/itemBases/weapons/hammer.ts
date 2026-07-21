import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_hammer",
	name: "Hammer",
	basePrice: 50,
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/hammers/Hammer_21.png",
		"items/weapons/hammers/Hammer_22.png",
		"items/weapons/hammers/Hammer_23.png",
		"items/weapons/hammers/Hammer_24.png",
		"items/weapons/hammers/Hammer_25.png",
		"items/weapons/hammers/Hammer_26.png",
		"items/weapons/hammers/Hammer_27.png",
		"items/weapons/hammers/Hammer_28.png",
		"items/weapons/hammers/Hammer_29.png",
		"items/weapons/hammers/Hammer_47.png",
		"items/weapons/hammers/Hammer_48.png",
		"items/weapons/hammers/Hammer_49.png",
		"items/weapons/hammers/Hammer_50.png",
		"items/weapons/hammers/hammer_53.png",
		"items/weapons/hammers/hammer_54.png",
	],
	tags: [],
});
