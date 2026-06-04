import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAszjI5aLEjg2Bkd7Da?alt=media&token=e0edf43f-c7ad-4013-a893-f9f505a9f5d3",
	level: 2,
	max: 10,
	min: 1,
	name: "Katana",
	price: 270,
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 1,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "sword",
	id: "katana",
});
