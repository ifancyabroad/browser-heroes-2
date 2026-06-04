import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"Drake's Talon is a razor-sharp weapon made from a drake's claw, featuring a curved blade that glimmers with an otherworldly sheen. Lightweight and balanced, it allows for swift strikes, making it a favored choice for hunters and warriors seeking deadly precision.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a9NyNFTJSNN3flj0z?alt=media&token=ceabf1fe-7ec5-4240-a19e-8d7b57b229a3",
	level: 3,
	max: 8,
	min: 3,
	name: "Drake's Talon",
	price: 750,
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 25,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "axe",
	id: "drakes_talon",
});
