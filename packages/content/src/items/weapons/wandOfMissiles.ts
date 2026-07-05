import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "wand_of_missiles",
	name: "Wand of Missiles",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAt11-x-kpBMO4UO6Js?alt=media&token=dc4e4274-49b8-4ea9-b0d5-121d78df5345",
	price: 290,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4",
		type: "piercing",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
