import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_boneclub",
	name: "Boneclub",
	basePrice: 40,
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O838EeKMsy_Xw7WPyND?alt=media&token=12b74f85-8519-4eb3-b78f-ad018ae687eb",
	],
	tags: [],
});
