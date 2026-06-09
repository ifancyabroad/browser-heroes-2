import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "greatsword",
	name: "Greatsword",
	description:
		"The Greatsword is a massive, double-edged blade designed for powerful, sweeping strikes. With a long grip for two-handed use, it offers excellent reach and devastating damage in combat. This sword is favored by formidable warriors who seek to dominate their foes with sheer strength and skill.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgK0n7aPw0NHeefOnRg?alt=media&token=6797c36e-4049-4626-b0c0-ff46100ae0fd",
	price: 300,
	rarity: "common",
	type: "weapon",
	weaponType: "sword",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d7+3",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
