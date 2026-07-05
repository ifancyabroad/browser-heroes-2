import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_warding",
	name: "Staff of Warding",
	description:
		"The Staff of Warding is a sturdy rod adorned with protective runes and a glowing crystal. Designed to enhance defensive spells, it creates barriers against magical attacks. Favored by guardians, this staff embodies safety and vigilance in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O884ErbLr06vlIendww?alt=media&token=e491f5e8-337d-47d5-a93c-fd6c2d88fdb5",
	price: 1400,
	rarity: "epic",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	attackRiders: [],
	tags: [],
});
