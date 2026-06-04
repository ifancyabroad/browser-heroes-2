import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsiakk057L35nKt7RA?alt=media&token=3bf0fdb0-9a14-480b-98b7-53b7fae2f0bc",
	level: 2,
	max: 7,
	min: 2,
	name: "Protective Mace",
	price: 260,
	properties: [
		{
			name: "slashing",
			type: "resistance",
			value: 10,
		},
		{
			name: "crushing",
			type: "resistance",
			value: 10,
		},
		{
			name: "piercing",
			type: "resistance",
			value: 10,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "mace",
	id: "protective_mace",
});
