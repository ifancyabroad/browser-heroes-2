import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_cold",
	name: "Staff of Cold",
	description:
		"The Staff of Cold is a sleek, icy blue rod adorned with frost motifs and a shimmering crystal at its tip. This staff channels chilling magic, allowing the wielder to cast powerful ice spells. Favored by frost mages, it embodies the essence of winter and the power of the frozen elements.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O881adjBhWBB9IW_gRE?alt=media&token=91193af8-eb3c-418d-b78b-0425b472cda2",
	price: 640,
	rarity: "common",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
