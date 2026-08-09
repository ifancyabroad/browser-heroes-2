import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "voidpiercer",
	name: "Voidpiercer",
	description:
		"The Voidpiercer is a sleek, obsidian dagger that seems to absorb light, with a blade that glimmers with otherworldly energy. Designed for swift, lethal strikes, it can bypass armor and defenses. Favored by shadowy assassins, this dagger embodies the essence of darkness and death.",
	icon: "items/weapons/daggers/Dagger_v2_47.png",
	price: 2900,
	rarity: "legendary",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+4",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
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
					dice: "1d10",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
