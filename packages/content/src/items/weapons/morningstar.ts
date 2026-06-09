import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "morningstar",
	name: "Morningstar",
	description:
		"The Morningstar is a spiked weapon with a heavy, spiked ball attached to a sturdy handle by a chain. This design allows for powerful swinging strikes that can penetrate armor. Favored by knights, it combines lethality with elegance, making it effective in close combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO-8McFOtJ7gLrS1UI?alt=media&token=cce7f1c9-5fe2-4728-ac2c-a666dda298b3",
	price: 100,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
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
