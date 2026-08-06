import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_fire_staff",
	name: "Fire Staff",
	basePrice: 105,
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "fire",
		attribute: "intelligence",
	},
	iconPool: [
		"items/weapons/staves/staff_13.png",
		"items/weapons/staves/staff_14.png",
		"items/weapons/staves/staff_15.png",
	],
	tags: [],
});
