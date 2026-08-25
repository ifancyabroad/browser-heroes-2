import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_lightning_staff",
	name: "Lightning Staff",
	basePrice: 105,
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8",
		type: "lightning",
		damageClass: "magical",
		attribute: "intelligence",
	},
	iconPool: [
		"items/weapons/staves/staff_26.png",
		"items/weapons/staves/staff_27.png",
		"items/weapons/staves/staff_29.png",
	],
	tags: [],
});
