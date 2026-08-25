import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "will_of_galorin",
	name: "Will of Galorin",
	description:
		"Galorin's unyielding will burns within this staff, granting the fortitude to command fire with unmatched destructive force.",
	icon: "items/weapons/staves/Staff_v2_52.png",
	price: 4200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8+5",
		type: "fire",
		damageClass: "magical",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: [],
});
