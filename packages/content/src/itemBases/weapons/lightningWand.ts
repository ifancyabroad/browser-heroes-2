import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_lightning_wand",
	name: "Lightning Wand",
	basePrice: 60,
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "lightning",
		attribute: "intelligence",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O884md7d30ncYCBN352?alt=media&token=f229cba4-de49-4704-ad35-46e201c6245a",
	],
	tags: [],
});
