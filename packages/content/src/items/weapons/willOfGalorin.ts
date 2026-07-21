import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "will_of_galorin",
	name: "Will of Galorin",
	description: "",
	icon: "items/weapons/staves/Staff_v2_52.png",
	price: 2500,
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
			stat: "intelligence",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 80,
		},
	],
	attackRiders: [],
	tags: [],
});
