import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_dagger",
	name: "Fine Dagger",
	description:
		"The Fine Dagger is a sleek, elegantly designed blade with a polished hilt and intricate details. Lightweight and perfectly balanced, it allows for swift, precise strikes. Favored by assassins and nobles alike, it combines beauty with deadly efficiency in close combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO0Km6wNCpoHt51Smw?alt=media&token=d285dfe0-2e3d-4659-aeb5-ea040a2f02a4",
	price: 90,
	rarity: "common",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+1",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
