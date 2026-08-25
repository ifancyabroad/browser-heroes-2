import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_greatclub",
	name: "Greatclub",
	basePrice: 105,
	type: "weapon",
	weaponType: "greatclub",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		damageClass: "physical",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/clubs/Club_v2_05.png",
		"items/weapons/clubs/Club_v2_22.png",
		"items/weapons/clubs/Club_v2_24.png",
	],
	tags: [],
});
