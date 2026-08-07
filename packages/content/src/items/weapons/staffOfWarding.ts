import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_warding",
	name: "Staff of Warding",
	description:
		"The Staff of Warding is a sturdy rod adorned with protective runes and a glowing crystal. Designed to enhance defensive spells, it creates barriers against magical attacks. Favored by guardians, this staff embodies safety and vigilance in battle.",
	icon: "items/weapons/staves/staff_28.png",
	price: 1400,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
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
