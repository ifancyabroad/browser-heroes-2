import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "travellers_staff",
	name: "Traveller's Staff",
	description:
		"The Traveller's Staff is a sturdy, wooden rod designed for both support and defense on long journeys. Lightweight and easily maneuverable, it features a simple design with a few carved symbols for good luck. This staff is favored by adventurers for its practicality and versatility in the wild.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NgO2__1WpZ52xfbNJx_?alt=media&token=a0aeb719-1576-41f7-9948-a878524cd3b4",
	price: 230,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
