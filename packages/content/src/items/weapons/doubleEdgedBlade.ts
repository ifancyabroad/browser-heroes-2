import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			damageType: "slashing",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsfwgsiG2apqDrTmKa?alt=media&token=87dd4d47-c113-49f3-b940-7a063995f5e5",
	level: 2,
	max: 5,
	min: 2,
	name: "Double Edged Blade",
	price: 140,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "double_edged_blade",
});
