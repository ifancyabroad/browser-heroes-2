import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Axe of the Frozen Wastes features a shimmering blade adorned with frost patterns. Designed for powerful swings, it delivers chilling damage, freezing foes in their tracks. Favored by northern warriors, this axe embodies the strength and harshness of winter.",
	effects: [
		{
			damageType: "cold",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a6m6kRcxAc9j7bxwQ?alt=media&token=5e03787f-da34-4b9d-b654-a08730f1624c",
	level: 4,
	max: 14,
	min: 5,
	name: "Axe of the Frozen Wastes",
	price: 1440,
	properties: [
		{
			name: "cold",
			type: "resistance",
			value: 50,
		},
		{
			name: "cold",
			type: "damage",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "axe",
	id: "axe_of_the_frozen_wastes",
});
