import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_boneclub",
	name: "Boneclub",
	basePrice: 85,
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: ["items/weapons/clubs/Club_v2_01.png"],
	tags: [],
});
