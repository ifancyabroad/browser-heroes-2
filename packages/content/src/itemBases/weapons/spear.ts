import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_spear",
	name: "Spear",
	type: "weapon",
	weaponType: "spear",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "piercing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK0TICJLv1vVaBGrbT?alt=media&token=aacd81c0-2d15-4023-8702-6c4d1140d26e",
	],
	tags: [],
});
