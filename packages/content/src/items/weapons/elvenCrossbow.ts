import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"The Elven Crossbow is a finely crafted weapon made from lightweight wood, featuring elegant leaf patterns. Its design allows for quick loading and precise shots, making it a favorite among skilled elven marksmen for stealthy, effective strikes from a distance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O839l2OfPHKXuAb-F68?alt=media&token=0dde223d-ef64-496e-bc95-08caf5e8bead",
	level: 3,
	max: 10,
	min: 3,
	name: "Elven Crossbow",
	price: 680,
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "piercing",
			type: "damage",
			value: 20,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "crossbow",
	id: "elven_crossbow",
});
