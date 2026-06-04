import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			damageType: "cold",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMKS39Dm6hnYK35bOm?alt=media&token=12abcdfd-3282-4566-9fd3-e8e4da0dd9e1",
	level: 2,
	max: 5,
	min: 2,
	name: "Frosty Dagger",
	price: 160,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "frosty_dagger",
});
