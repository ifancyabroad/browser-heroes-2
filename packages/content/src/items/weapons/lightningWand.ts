import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "lightning_wand",
	name: "Lightning Wand",
	description:
		"The Lightning Wand is a sleek, silver rod that crackles with electrical energy. When wielded, it releases arcs of lightning, stunning foes or igniting flammable objects. Favored by storm mages, it feels charged to the touch, hinting at the powerful spells ready to be unleashed.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O884md7d30ncYCBN352?alt=media&token=f229cba4-de49-4704-ad35-46e201c6245a",
	price: 60,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "lightning",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
