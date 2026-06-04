import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsyMrMxiREAP6TWo4s?alt=media&token=57c1fe4c-86b6-4f3a-ad24-ea9a802def71",
	level: 2,
	max: 9,
	min: 2,
	name: "Staff of Lightning",
	price: 260,
	properties: [
		{
			name: "lightning",
			type: "damage",
			value: 25,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 25,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_lightning",
});
