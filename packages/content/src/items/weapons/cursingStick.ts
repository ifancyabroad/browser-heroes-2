import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	effects: [
		{
			difficulty: 12,
			duration: 3,
			effect: "curse",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAshWX7bewXN5wSNS9O?alt=media&token=e048efc6-6ab4-4fe3-b5ee-241c7a3b3197",
	level: 2,
	max: 7,
	min: 2,
	name: "Cursing Stick",
	price: 230,
	size: "oneHanded",
	type: "weapon",
	weaponType: "mace",
	id: "cursing_stick",
});
