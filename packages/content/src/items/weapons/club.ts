import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "club",
	name: "Club",
	description:
		"The Club is a simple, blunt weapon made from a solid piece of hardwood. Its thick, rounded head is designed for close-range strikes, delivering powerful blows with minimal finesse. Common among novice fighters, it’s a reliable tool for straightforward combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgNzsJrS-5TLLJ5aZCn?alt=media&token=9e00ec05-fc8f-45d1-a46e-09a4b653fe32",
	price: 20,
	rarity: "common",
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
