import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Star of Vengeance is a unique, star-shaped dagger with four sharp blades radiating from a central point. Designed for swift, multidirectional strikes, it delivers devastating damage with precision. Favored by skilled assassins, this dagger embodies the art of stealth and deadly retribution.",
	effects: [
		{
			damageType: "slashing",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "slashing",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "slashing",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86wneXTVhQsT7cKjoF?alt=media&token=a88b1d6b-a3c0-45a0-a941-36748000c5c1",
	level: 4,
	max: 7,
	min: 4,
	name: "Star of Vengeance",
	price: 1100,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "star_of_vengeance",
});
