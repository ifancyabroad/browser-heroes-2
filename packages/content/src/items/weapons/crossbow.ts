import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "crossbow",
	name: "Crossbow",
	description:
		"The Crossbow is a sturdy ranged weapon made of polished wood and steel, designed for precise, powerful shots. Its mechanical draw allows even novice users to deliver bolts with deadly accuracy. Reliable and easy to load, it’s favored by hunters and soldiers alike for mid-range engagements.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgNzkZJ0nG0Iep0uzOb?alt=media&token=0e1a7fc6-e4c8-4bf9-aed3-12d65deccbd4",
	price: 80,
	rarity: "common",
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
