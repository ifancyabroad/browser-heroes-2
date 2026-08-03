import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_shortsword",
	name: "Shortsword",
	basePrice: 90,
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "piercing",
		attribute: "dexterity",
	},
	iconPool: [
		"items/weapons/swords/Sword_01.png",
		"items/weapons/swords/Sword_03.png",
		"items/weapons/swords/Sword_08.png",
		"items/weapons/swords/Sword_22.png",
		"items/weapons/swords/Sword_38.png",
	],
	tags: [],
});
