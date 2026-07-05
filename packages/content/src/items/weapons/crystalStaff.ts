import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "crystal_staff",
	name: "Crystal Staff",
	description:
		"The Crystal Staff is an elegant, tall rod adorned with a large, luminous crystal at its tip. This staff channels magical energies, allowing spellcasters to enhance their spells and harness elemental forces. Often sought after by wizards, its beauty is matched by its potent magical capabilities.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O883TxE3EKQl4pDIJkT?alt=media&token=d681b87d-454f-4632-a3c5-211e48542c06",
	price: 280,
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
			damageType: "cold",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
