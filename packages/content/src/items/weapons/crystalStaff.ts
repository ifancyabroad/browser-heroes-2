import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Crystal Staff is an elegant, tall rod adorned with a large, luminous crystal at its tip. This staff channels magical energies, allowing spellcasters to enhance their spells and harness elemental forces. Often sought after by wizards, its beauty is matched by its potent magical capabilities.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O883TxE3EKQl4pDIJkT?alt=media&token=d681b87d-454f-4632-a3c5-211e48542c06",
	level: 2,
	max: 9,
	min: 2,
	name: "Crystal Staff",
	price: 280,
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 20,
		},
		{
			name: "fire",
			type: "damage",
			value: 20,
		},
		{
			name: "lightning",
			type: "damage",
			value: 20,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "crystal_staff",
});
