import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "cold",
	description:
		"The Elementalist's Wand is a beautifully crafted rod adorned with symbols of fire, water, earth, and air. This wand allows the wielder to channel elemental magic, casting powerful spells of all four elements. Favored by versatile mages, it embodies the balance of nature’s forces in battle.",
	effects: [
		{
			damageType: "fire",
			max: 7,
			min: 4,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "lightning",
			max: 7,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O888xxIucji-VaJ0gco?alt=media&token=6edaae9a-7dc8-440e-9c0c-859f2ee84de9",
	level: 4,
	max: 7,
	min: 4,
	name: "Elementalist's Wand",
	price: 1060,
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "elementalists_wand",
});
