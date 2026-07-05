import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "star_of_vengeance",
	name: "Star of Vengeance",
	description:
		"The Star of Vengeance is a unique, star-shaped dagger with four sharp blades radiating from a central point. Designed for swift, multidirectional strikes, it delivers devastating damage with precision. Favored by skilled assassins, this dagger embodies the art of stealth and deadly retribution.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86wneXTVhQsT7cKjoF?alt=media&token=a88b1d6b-a3c0-45a0-a941-36748000c5c1",
	price: 1100,
	rarity: "epic",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+3",
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
					damageType: "slashing",
					dice: "1d6",
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
					damageType: "slashing",
					dice: "1d6",
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
					damageType: "slashing",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
