import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_handaxe",
	name: "Fine Handaxe",
	description:
		"The Fine Handaxe is a beautifully crafted weapon with a sharp, polished blade and an elegantly designed handle. Its lightweight and balanced build allows for swift, precise strikes. This handaxe is favored by adventurers who appreciate both aesthetics and functionality in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO1IZu27jgUnBZOesh?alt=media&token=5ba7ac52-5c76-40da-9cdf-133b085bf997",
	price: 100,
	rarity: "common",
	type: "weapon",
	weaponType: "axe",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
