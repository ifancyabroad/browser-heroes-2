import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	effects: [
		{
			damageType: "radiant",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsgUrk7rmoefD3EbAf?alt=media&token=8fae1bc6-8ec8-4493-8da8-34adfe403c30",
	level: 2,
	max: 11,
	min: 2,
	name: "Righteous Hammer",
	price: 270,
	size: "twoHanded",
	type: "weapon",
	weaponType: "hammer",
	id: "righteous_hammer",
});
