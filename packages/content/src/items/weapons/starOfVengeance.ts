import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "star_of_vengeance",
	name: "Star of Vengeance",
	description:
		"The Star of Vengeance is a unique, star-shaped dagger with four sharp blades radiating from a central point. Designed for swift, multidirectional strikes, it delivers devastating damage with precision. Favored by skilled assassins, this dagger embodies the art of stealth and deadly retribution.",
	icon: "items/weapons/daggers/Dagger_12.png",
	price: 2600,
	rarity: "legendary",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	attackRange: "melee",
	damage: {
		dice: "1d4+4",
		type: "piercing",
		damageClass: "physical",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 3,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "slashing",
					damageClass: "physical",
					dice: "3d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
