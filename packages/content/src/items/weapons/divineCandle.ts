import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "divine_candle",
	name: "Divine Candle",
	description:
		"A sacred flame burns atop this staff without consuming it, magnifying radiant power and guiding restorative prayers.",
	icon: "items/weapons/staves/Staff_v2_35.png",
	price: 1460,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
		type: "radiant",
		attribute: "wisdom",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyHealing",
			multiplier: 1.5,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
	],
	attackRiders: [],
	tags: [],
});
