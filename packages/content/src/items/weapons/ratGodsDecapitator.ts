import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			difficulty: 24,
			duration: 6,
			effect: "bleed",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 24,
			duration: 2,
			modifier: "constitution",
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCn-7fbuTczpdGL51Ob?alt=media&token=3215d999-1642-442d-8739-aaad4b503759",
	level: 5,
	max: 15,
	min: 9,
	name: "Rat God's Decapitator",
	price: 2600,
	properties: [
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 4,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "axe",
	id: "rat_gods_decapitator",
});
