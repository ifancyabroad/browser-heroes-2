import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCje5NY8tvXxytEERmn?alt=media&token=e349508a-e35a-4b0b-bc67-697db8e39ed9",
	level: 5,
	max: 12,
	min: 5,
	name: "Will of Galorin",
	price: 2500,
	properties: [
		{
			name: "intelligence",
			type: "stat",
			value: 4,
		},
		{
			name: "constitution",
			type: "stat",
			value: 4,
		},
		{
			name: "fire",
			type: "damage",
			value: 80,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "will_of_galorin",
});
