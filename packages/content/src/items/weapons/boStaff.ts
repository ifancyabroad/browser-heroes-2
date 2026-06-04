import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OI6XABb86ffAJIOt5Zr?alt=media&token=96f1c1b9-aeb0-4f1f-9f56-ee955c7a6c99",
	level: 3,
	max: 12,
	min: 3,
	name: "Bo Staff",
	price: 560,
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "bo_staff",
});
