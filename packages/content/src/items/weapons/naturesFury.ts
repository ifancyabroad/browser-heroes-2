import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description: "",
	effects: [
		{
			difficulty: 19,
			duration: 4,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			difficulty: 19,
			duration: 2,
			modifier: "constitution",
			properties: [
				{
					name: "poison",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			damageType: "poison",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OEnxXfaHmNcWzFN8xR3?alt=media&token=ae4077c1-93e1-4fff-8454-71d8151be4f6",
	level: 5,
	max: 13,
	min: 6,
	name: "Nature's Fury",
	price: 2600,
	properties: [
		{
			name: "hitChance",
			type: "auxiliaryStat",
			value: 4,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "bow",
	id: "natures_fury",
});
