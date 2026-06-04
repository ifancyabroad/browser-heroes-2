import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Staff of Cold is a sleek, icy blue rod adorned with frost motifs and a shimmering crystal at its tip. This staff channels chilling magic, allowing the wielder to cast powerful ice spells. Favored by frost mages, it embodies the essence of winter and the power of the frozen elements.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O881adjBhWBB9IW_gRE?alt=media&token=91193af8-eb3c-418d-b78b-0425b472cda2",
	level: 3,
	max: 10,
	min: 3,
	name: "Staff of Cold",
	price: 640,
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 40,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_cold",
});
