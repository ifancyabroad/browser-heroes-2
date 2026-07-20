import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_crossbow",
	name: "Crossbow",
	basePrice: 80,
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "dexterity",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgNzkZJ0nG0Iep0uzOb?alt=media&token=0e1a7fc6-e4c8-4bf9-aed3-12d65deccbd4",
	],
	tags: [],
});
