import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OI6WPS67ruK5CEZybAn?alt=media&token=d882c531-920d-4cde-8657-5574b841233c",
	level: 4,
	max: 11,
	min: 4,
	name: "Divine Candle",
	price: 1460,
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 50,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 50,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "divine_candle",
});
