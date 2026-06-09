import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "voidpiercer",
	name: "Voidpiercer",
	description:
		"The Voidpiercer is a sleek, obsidian dagger that seems to absorb light, with a blade that glimmers with otherworldly energy. Designed for swift, lethal strikes, it can bypass armor and defenses. Favored by shadowy assassins, this dagger embodies the essence of darkness and death.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4aBRIJNPKNLTCixx0a?alt=media&token=23b9bf79-ac45-436b-b963-6117b98de865",
	price: 1380,
	rarity: "common",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+4",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 40,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "1d8",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
