import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_flail",
	name: "Flail",
	basePrice: 115,
	type: "weapon",
	weaponType: "flail",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		damageClass: "physical",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/clubs/Club_v2_15.png",
		"items/weapons/clubs/Club_v2_16.png",
		"items/weapons/clubs/Club_v2_17.png",
		"items/weapons/clubs/Club_v2_18.png",
		"items/weapons/clubs/Club_v2_19.png",
	],
	tags: [],
});
