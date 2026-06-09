import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_spear",
	name: "Fine Spear",
	description:
		"The Fine Spear is an exquisitely crafted weapon with a sharp, polished tip and an elegantly designed shaft. Its balanced construction allows for powerful thrusts and precise throws. This spear blends beauty with practicality, making it a favored choice among skilled fighters.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO2xYEe4Kzg3ST0JW2?alt=media&token=bd8a4cfb-20e8-4374-b9a1-22b50751d2cc",
	price: 100,
	rarity: "common",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+1",
		type: "piercing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
