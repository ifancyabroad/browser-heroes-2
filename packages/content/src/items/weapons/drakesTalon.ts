import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "drakes_talon",
	name: "Drake's Talon",
	description:
		"Drake's Talon is a razor-sharp weapon made from a drake's claw, featuring a curved blade that glimmers with an otherworldly sheen. Lightweight and balanced, it allows for swift strikes, making it a favored choice for hunters and warriors seeking deadly precision.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a9NyNFTJSNN3flj0z?alt=media&token=ceabf1fe-7ec5-4240-a19e-8d7b57b229a3",
	price: 750,
	rarity: "rare",
	type: "weapon",
	weaponType: "axe",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+2",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 25,
		},
	],
	attackRiders: [],
	tags: [],
});
