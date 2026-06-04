import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsgwpOgJdx0pEfQrbR?alt=media&token=5e6e0054-f988-4196-8835-ab8ad9886dfa",
	level: 2,
	max: 7,
	min: 2,
	name: "Dwarven Mallet",
	price: 230,
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 1,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "hammer",
	id: "dwarven_mallet",
});
