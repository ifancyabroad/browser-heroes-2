import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_quarterstaff",
	name: "Quarterstaff",
	basePrice: 30,
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"items/weapons/staves/Staff_v2_01.png",
		"items/weapons/staves/Staff_v2_02.png",
		"items/weapons/staves/Staff_v2_03.png",
		"items/weapons/staves/Staff_v2_04.png",
		"items/weapons/staves/Staff_v2_05.png",
		"items/weapons/staves/Staff_v2_06.png",
		"items/weapons/staves/Staff_v2_07.png",
	],
	tags: [],
});
