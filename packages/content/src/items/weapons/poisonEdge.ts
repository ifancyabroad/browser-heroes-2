import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Poison Edge is a sleek, dark blade with a subtle green hue, designed to deliver swift, deadly strikes. Coated in a potent toxin, each cut can inflict lingering damage on foes. Favored by assassins, this weapon combines elegance with a lethal touch, perfect for stealthy eliminations.",
	effects: [
		{
			difficulty: 14,
			duration: 4,
			effect: "poison",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
		{
			damageType: "poison",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4aAUt64OLYAgUJYhxR?alt=media&token=5bf2752f-d99f-452e-b948-af4ac666ad79",
	level: 3,
	max: 6,
	min: 3,
	name: "Poison Edge",
	price: 700,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "poison_edge",
});
