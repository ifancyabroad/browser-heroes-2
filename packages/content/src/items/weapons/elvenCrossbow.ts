import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "elven_crossbow",
	name: "Elven Crossbow",
	description:
		"The Elven Crossbow is a finely crafted weapon made from lightweight wood, featuring elegant leaf patterns. Its design allows for quick loading and precise shots, making it a favorite among skilled elven marksmen for stealthy, effective strikes from a distance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O839l2OfPHKXuAb-F68?alt=media&token=0dde223d-ef64-496e-bc95-08caf5e8bead",
	price: 680,
	rarity: "rare",
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+2",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
