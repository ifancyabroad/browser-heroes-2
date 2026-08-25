import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_necrotic_staff",
	name: "Necrotic Staff",
	basePrice: 105,
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8",
		type: "necrotic",
		damageClass: "magical",
		attribute: "wisdom",
	},
	iconPool: [
		"items/weapons/staves/staff_23.png",
		"items/weapons/staves/staff_31.png",
		"items/weapons/staves/staff_32.png",
	],
	tags: [],
});
