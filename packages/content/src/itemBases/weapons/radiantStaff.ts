import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_radiant_staff",
	name: "Radiant Staff",
	basePrice: 105,
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8",
		type: "radiant",
		damageClass: "magical",
		attribute: "wisdom",
	},
	iconPool: [
		"items/weapons/staves/staff_1.png",
		"items/weapons/staves/staff_2.png",
		"items/weapons/staves/staff_3.png",
		"items/weapons/staves/staff_4.png",
		"items/weapons/staves/staff_5.png",
		"items/weapons/staves/staff_6.png",
	],
	tags: [],
});
