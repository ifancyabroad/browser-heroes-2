import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Staff of Warding is a sturdy rod adorned with protective runes and a glowing crystal. Designed to enhance defensive spells, it creates barriers against magical attacks. Favored by guardians, this staff embodies safety and vigilance in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O884ErbLr06vlIendww?alt=media&token=e491f5e8-337d-47d5-a93c-fd6c2d88fdb5",
	level: 4,
	max: 11,
	min: 4,
	name: "Staff of Warding",
	price: 1400,
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 25,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 25,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 25,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_warding",
});
