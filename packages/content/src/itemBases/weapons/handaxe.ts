import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_handaxe",
	name: "Handaxe",
	basePrice: 90,
	type: "weapon",
	weaponType: "axe",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "slashing",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/axes/Axe_03.png",
		"items/weapons/axes/Axe_04.png",
		"items/weapons/axes/Axe_15.png",
		"items/weapons/axes/Axe_16.png",
		"items/weapons/axes/Axe_17.png",
		"items/weapons/axes/Axe_18.png",
		"items/weapons/axes/Axe_19.png",
		"items/weapons/axes/Axe_20.png",
		"items/weapons/axes/Axe_52.png",
		"items/weapons/axes/Axe_53.png",
		"items/weapons/axes/Axe_v2_04.png",
		"items/weapons/axes/Axe_v2_05.png",
		"items/weapons/axes/Axe_v2_06.png",
	],
	tags: [],
});
