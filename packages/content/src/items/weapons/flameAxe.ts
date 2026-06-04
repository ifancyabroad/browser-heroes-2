import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsc6P15nQYmy1HveLm?alt=media&token=d096b492-8ae4-4127-a2e1-6d20e0415071",
	level: 2,
	max: 11,
	min: 2,
	name: "Flame Axe",
	price: 280,
	size: "twoHanded",
	type: "weapon",
	weaponType: "axe",
	id: "flame_axe",
});
