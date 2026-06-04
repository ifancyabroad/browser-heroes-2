import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMLXg0JszLaTsPa2ad?alt=media&token=9e75c817-b42b-4ddf-8dd1-fef681fd313e",
	level: 3,
	max: 10,
	min: 3,
	name: "Holy Staff",
	price: 620,
	properties: [
		{
			name: "heal",
			type: "heal",
			value: 40,
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
	id: "holy_staff",
});
