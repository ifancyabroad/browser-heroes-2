import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "frosty_dagger",
	name: "Frosty Dagger",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OIMKS39Dm6hnYK35bOm?alt=media&token=12abcdfd-3282-4566-9fd3-e8e4da0dd9e1",
	price: 160,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+1",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
