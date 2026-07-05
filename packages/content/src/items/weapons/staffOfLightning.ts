import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_lightning",
	name: "Staff of Lightning",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsyMrMxiREAP6TWo4s?alt=media&token=57c1fe4c-86b6-4f3a-ad24-ea9a802def71",
	price: 260,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 25,
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
