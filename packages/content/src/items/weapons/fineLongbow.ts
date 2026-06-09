import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_longbow",
	name: "Fine Longbow",
	description:
		"The Fine Longbow is an elegantly crafted weapon made from polished wood, featuring intricate designs along the limbs. It offers exceptional flexibility and power, allowing skilled archers to shoot arrows with remarkable accuracy. This longbow combines beauty and performance for elite marksmen.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O836Y7Gx_vk9fruIwmR?alt=media&token=7ff49fc3-0afa-4a7c-8f4c-4bbde3f0fe7a",
	price: 140,
	rarity: "common",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+1",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
