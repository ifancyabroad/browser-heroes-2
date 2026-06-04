import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Traveller's Staff is a sturdy, wooden rod designed for both support and defense on long journeys. Lightweight and easily maneuverable, it features a simple design with a few carved symbols for good luck. This staff is favored by adventurers for its practicality and versatility in the wild.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO2__1WpZ52xfbNJx_?alt=media&token=a0aeb719-1576-41f7-9948-a878524cd3b4",
	level: 2,
	max: 9,
	min: 2,
	name: "Traveller's Staff",
	price: 230,
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
		{
			name: "cold",
			type: "damage",
			value: 20,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "travellers_staff",
});
