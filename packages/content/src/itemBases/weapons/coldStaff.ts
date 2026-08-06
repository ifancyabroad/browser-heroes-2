import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_cold_staff",
	name: "Cold Staff",
	basePrice: 105,
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "cold",
		attribute: "intelligence",
	},
	iconPool: [
		"items/weapons/staves/staff_16.png",
		"items/weapons/staves/staff_17.png",
		"items/weapons/staves/staff_20.png",
		"items/weapons/staves/staff_21.png",
	],
	tags: [],
});
