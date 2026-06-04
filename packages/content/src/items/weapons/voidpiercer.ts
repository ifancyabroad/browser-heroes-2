import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Voidpiercer is a sleek, obsidian dagger that seems to absorb light, with a blade that glimmers with otherworldly energy. Designed for swift, lethal strikes, it can bypass armor and defenses. Favored by shadowy assassins, this dagger embodies the essence of darkness and death.",
	effects: [
		{
			damageType: "necrotic",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4aBRIJNPKNLTCixx0a?alt=media&token=23b9bf79-ac45-436b-b963-6117b98de865",
	level: 4,
	max: 8,
	min: 5,
	name: "Voidpiercer",
	price: 1380,
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 40,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "voidpiercer",
});
