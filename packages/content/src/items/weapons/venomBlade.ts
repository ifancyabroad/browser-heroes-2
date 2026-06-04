import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			difficulty: 16,
			duration: 2,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsywEq4QvRRmq2hLKG?alt=media&token=174229a2-1d4a-4fbd-89da-765fd5d8f3a2",
	level: 2,
	max: 7,
	min: 2,
	name: "Venom Blade",
	price: 250,
	size: "oneHanded",
	type: "weapon",
	weaponType: "sword",
	id: "venom_blade",
});
