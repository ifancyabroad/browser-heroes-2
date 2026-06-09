import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "greatclub",
	name: "Greatclub",
	description:
		"The Greatclub is a massive, blunt weapon crafted from a sturdy tree trunk, often stripped of bark for a smoother grip. Its sheer size and weight deliver devastating blows, making it a favored choice for powerful warriors.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgToUYVTRc1av-QcBA2?alt=media&token=5c1df0e7-d3fe-457f-b32b-1b29d9d16903",
	price: 70,
	rarity: "common",
	type: "weapon",
	weaponType: "club",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
