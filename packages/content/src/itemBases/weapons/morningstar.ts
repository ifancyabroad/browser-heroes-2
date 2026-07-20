import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_morningstar",
	name: "Morningstar",
	basePrice: 100,
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO-8McFOtJ7gLrS1UI?alt=media&token=cce7f1c9-5fe2-4728-ac2c-a666dda298b3",
	],
	tags: [],
});
