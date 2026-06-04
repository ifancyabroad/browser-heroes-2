import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsd0XmXJ11SL3kS6QB?alt=media&token=f4593aa1-45d4-4cdb-b999-9cb4e62724a2",
	level: 2,
	max: 9,
	min: 2,
	name: "Bow of the Fox",
	price: 230,
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "bow",
	id: "bow_of_the_fox",
});
