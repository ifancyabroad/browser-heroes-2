import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_club",
	name: "Club",
	basePrice: 70,
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d4",
		type: "crushing",
		damageClass: "physical",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/clubs/Club_v2_02.png",
		"items/weapons/clubs/Club_v2_03.png",
		"items/weapons/clubs/Club_v2_04.png",
	],
	tags: [],
});
