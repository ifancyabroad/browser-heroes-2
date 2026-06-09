import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_hammer",
	name: "Fine Hammer",
	description:
		"The Fine Hammer is a meticulously crafted weapon featuring a polished head and an intricately designed handle. Its balanced weight allows for powerful, precise strikes, making it effective in combat. Favored by skilled craftsmen and warriors, it combines elegance with practical strength.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83AkiajvksrVOO9E_T?alt=media&token=730a3e5b-1757-4cf5-868d-c2144a1f3d5b",
	price: 100,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
