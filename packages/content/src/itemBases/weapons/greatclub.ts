import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_greatclub",
	name: "Greatclub",
	type: "weapon",
	weaponType: "club",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgToUYVTRc1av-QcBA2?alt=media&token=5c1df0e7-d3fe-457f-b32b-1b29d9d16903",
	],
	tags: [],
});
