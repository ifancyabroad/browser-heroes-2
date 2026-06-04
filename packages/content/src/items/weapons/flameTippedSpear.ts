import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description: "",
	effects: [
		{
			damageType: "fire",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsjLqbIj2xZ4VHkGai?alt=media&token=1c5af965-eb69-4e14-af6f-7ea747cbff3c",
	level: 2,
	max: 9,
	min: 2,
	name: "Flame Tipped Spear",
	price: 180,
	size: "twoHanded",
	type: "weapon",
	weaponType: "spear",
	id: "flame_tipped_spear",
});
