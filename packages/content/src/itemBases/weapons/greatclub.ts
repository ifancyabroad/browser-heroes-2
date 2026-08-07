import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_greatclub",
	name: "Greatclub",
	basePrice: 105,
	type: "weapon",
	weaponType: "greatclub",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/clubs/Club_v2_05.png",
		"items/weapons/clubs/Club_v2_22.png",
		"items/weapons/clubs/Club_v2_24.png",
	],
	tags: [],
});
