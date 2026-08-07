import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_protection",
	name: "Staff of Protection",
	description: "",
	icon: "items/weapons/staves/Staff_v2_21.png",
	price: 1360,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 6,
		},
	],
	attackRiders: [],
	tags: [],
});
