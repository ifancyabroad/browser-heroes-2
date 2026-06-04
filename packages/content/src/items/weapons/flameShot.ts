import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"Flame Shot is a beautifully crafted bow with fiery engravings along its limbs. When drawn, it ignites arrows in a blaze of fire, unleashing scorching shots that can engulf targets in flames. Favored by skilled archers, this bow is perfect for delivering both precision and destruction.",
	effects: [
		{
			damageType: "fire",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O837_TaJ6HTFBsgNpzS?alt=media&token=9c2ed3c7-e15d-46d0-a7e0-6bf2a5e37712",
	level: 4,
	max: 12,
	min: 5,
	name: "Flame Shot",
	price: 1280,
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "bow",
	id: "flame_shot",
});
