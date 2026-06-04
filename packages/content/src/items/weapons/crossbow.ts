import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"The Crossbow is a sturdy ranged weapon made of polished wood and steel, designed for precise, powerful shots. Its mechanical draw allows even novice users to deliver bolts with deadly accuracy. Reliable and easy to load, it’s favored by hunters and soldiers alike for mid-range engagements.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgNzkZJ0nG0Iep0uzOb?alt=media&token=0e1a7fc6-e4c8-4bf9-aed3-12d65deccbd4",
	level: 1,
	max: 8,
	min: 1,
	name: "Crossbow",
	price: 80,
	size: "twoHanded",
	type: "weapon",
	weaponType: "crossbow",
	id: "crossbow",
});
