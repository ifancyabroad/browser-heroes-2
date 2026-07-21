import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_club",
	name: "Club",
	basePrice: 20,
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/clubs/Club_v2_02.png",
		"items/weapons/clubs/Club_v2_03.png",
		"items/weapons/clubs/Club_v2_04.png",
	],
	tags: [],
});
