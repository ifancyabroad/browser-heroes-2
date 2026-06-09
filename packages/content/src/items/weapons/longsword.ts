import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "longsword",
	name: "Longsword",
	description:
		"The Longsword is a balanced, double-edged blade with a crossguard, ideal for versatile combat. Its length allows for both slashing and thrusting attacks, making it a favorite among knights and warriors. Commonly used, it combines elegance with practicality in a variety of battle scenarios.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NMmvhpTgBUrely_XRJ7?alt=media&token=566098e0-cf7d-4431-a066-928fbe833c0f",
	price: 50,
	rarity: "common",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
