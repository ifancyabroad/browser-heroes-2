import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_morningstar",
	name: "Morningstar",
	basePrice: 115,
	type: "weapon",
	weaponType: "morningstar",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8",
		type: "piercing",
		damageClass: "physical",
		attribute: "strength",
	},
	iconPool: ["items/weapons/clubs/Club_v2_07.png", "items/weapons/clubs/Club_v2_12.png"],
	tags: [],
});
