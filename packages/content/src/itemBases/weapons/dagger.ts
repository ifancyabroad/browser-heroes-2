import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_dagger",
	name: "Dagger",
	basePrice: 20,
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4",
		type: "slashing",
		attribute: "dexterity",
	},
	iconPool: [
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NNwMy0q-XKUT-EUvxFF?alt=media&token=a9fdd8a5-341c-423a-8ef5-a92726e15605",
	],
	tags: [],
});
