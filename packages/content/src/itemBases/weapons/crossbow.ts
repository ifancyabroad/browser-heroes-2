import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_crossbow",
	name: "Crossbow",
	basePrice: 115,
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "dexterity",
	},
	iconPool: [
		"items/weapons/crossbows/Crossbow_01.png",
		"items/weapons/crossbows/Crossbow_02.png",
		"items/weapons/crossbows/Crossbow_03.png",
		"items/weapons/crossbows/Crossbow_04.png",
		"items/weapons/crossbows/Crossbow_05.png",
		"items/weapons/crossbows/Crossbow_06.png",
		"items/weapons/crossbows/Crossbow_07.png",
		"items/weapons/crossbows/Crossbow_v2_01.png",
		"items/weapons/crossbows/Crossbow_v2_02.png",
		"items/weapons/crossbows/Crossbow_v2_03.png",
	],
	tags: [],
});
