import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "protective_mace",
	name: "Protective Mace",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsiakk057L35nKt7RA?alt=media&token=3bf0fdb0-9a14-480b-98b7-53b7fae2f0bc",
	price: 260,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
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
