import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "spear",
	name: "Spear",
	description:
		"The Spear is a long weapon with a sharp metal tip attached to a sturdy wooden shaft. Designed for thrusting and throwing, it’s effective in both melee and ranged combat. Common among soldiers and hunters, the spear offers reach and versatility in various battle situations.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK0TICJLv1vVaBGrbT?alt=media&token=aacd81c0-2d15-4023-8702-6c4d1140d26e",
	price: 40,
	rarity: "common",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
