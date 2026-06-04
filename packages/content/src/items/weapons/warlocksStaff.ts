import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsxyHjQ-ZKF19tCLPX?alt=media&token=3e2dc877-ed7a-4eb8-8bb3-a833f05d8077",
	level: 3,
	max: 10,
	min: 3,
	name: "Warlock's Staff",
	price: 720,
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 50,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "warlocks_staff",
});
