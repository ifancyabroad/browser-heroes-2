import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_protection",
	name: "Staff of Protection",
	description:
		"A steadfast staff whose layered enchantments fortify body and spirit, allowing its bearer to endure the fiercest assaults.",
	icon: "items/weapons/staves/Staff_v2_21.png",
	price: 1360,
	rarity: "legendary",
	type: "weapon",
	weaponType: "quarterstaff",
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
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 25,
		},
	],
	attackRiders: [],
	tags: [],
});
