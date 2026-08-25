import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_warding",
	name: "Staff of Warding",
	description:
		"Protective runes and a glowing crystal weave elemental wards around this staff, sheltering its bearer from flame, frost, and lightning.",
	icon: "items/weapons/staves/staff_28.png",
	price: 3400,
	rarity: "legendary",
	type: "weapon",
	weaponType: "quarterstaff",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8+4",
		type: "crushing",
		damageClass: "physical",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	attackRiders: [],
	tags: [],
});
