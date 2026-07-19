import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_club",
	name: "Club",
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4",
		type: "crushing",
		attribute: "strength",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgNzsJrS-5TLLJ5aZCn?alt=media&token=9e00ec05-fc8f-45d1-a46e-09a4b653fe32",
	],
	tags: [],
});
