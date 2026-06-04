import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description: "",
	effects: [
		{
			damageType: "lightning",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsfPOdP32ZXlykBQ1E?alt=media&token=441c467f-76fd-4b6a-be70-52299e40a1a0",
	level: 2,
	max: 5,
	min: 2,
	name: "Charged Dagger",
	price: 160,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "charged_dagger",
});
