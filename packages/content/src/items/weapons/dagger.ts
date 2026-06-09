import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dagger",
	name: "Dagger",
	description:
		"The Dagger is a short, sharp blade with a simple hilt, designed for quick, close-range strikes. Lightweight and easy to conceal, it’s ideal for swift, precise attacks or as a last-resort weapon. Common among rogues and adventurers, it’s both versatile and easy to wield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NNwMy0q-XKUT-EUvxFF?alt=media&token=a9fdd8a5-341c-423a-8ef5-a92726e15605",
	price: 20,
	rarity: "common",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
