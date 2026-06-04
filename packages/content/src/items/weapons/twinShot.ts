import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description: "",
	effects: [
		{
			damageType: "piercing",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsdWReq3s0PRRvYZlL?alt=media&token=0fe9bb49-8d14-437d-965c-64a4aa44ae95",
	level: 2,
	max: 9,
	min: 2,
	name: "Twin Shot",
	price: 270,
	size: "twoHanded",
	type: "weapon",
	weaponType: "crossbow",
	id: "twin_shot",
});
