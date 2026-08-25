import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_mace",
	name: "Mace",
	basePrice: 95,
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		damageClass: "physical",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/clubs/Club_v2_06.png",
		"items/weapons/clubs/Club_v2_08.png",
		"items/weapons/clubs/Club_v2_09.png",
		"items/weapons/clubs/Club_v2_11.png",
	],
	tags: [],
});
