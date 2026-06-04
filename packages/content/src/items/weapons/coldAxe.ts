import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			damageType: "cold",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsbhNIeaU_KfAgoA5W?alt=media&token=e233c8b8-b15b-47eb-a111-0ea2a7adf7d1",
	level: 2,
	max: 7,
	min: 2,
	name: "Cold Axe",
	price: 260,
	size: "oneHanded",
	type: "weapon",
	weaponType: "axe",
	id: "cold_axe",
});
