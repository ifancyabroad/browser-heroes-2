import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_battleaxe",
	name: "Fine Battleaxe",
	description:
		"The Fine Battleaxe is a beautifully crafted weapon with a polished blade and intricate engravings. Designed for both elegance and function, it delivers powerful strikes, making it a favorite among elite warriors who value both style and effectiveness in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO1-16PWvnT302EIO_?alt=media&token=dff6894b-be2c-4506-92c9-6e92e6228c6c",
	price: 140,
	rarity: "common",
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+1",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
