import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description: "",
	effects: [
		{
			damageType: "piercing",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "piercing",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAt11-x-kpBMO4UO6Js?alt=media&token=dc4e4274-49b8-4ea9-b0d5-121d78df5345",
	level: 2,
	max: 4,
	min: 1,
	name: "Wand of Missiles",
	price: 290,
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "wand_of_missiles",
});
