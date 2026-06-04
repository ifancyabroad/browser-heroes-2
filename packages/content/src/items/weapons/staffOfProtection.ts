import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMXPphDGKT4i3csv4K?alt=media&token=ef2cae9e-db75-4cf7-84db-b423337b8d40",
	level: 4,
	max: 11,
	min: 4,
	name: "Staff of Protection",
	price: 1360,
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 6,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_protection",
});
