import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "bloodletter",
	name: "Bloodletter",
	description:
		"Bloodletter is a sinister dagger with a jagged, crimson blade that gleams ominously. Designed for stealthy strikes, it inflicts deep wounds that bleed profusely, weakening foes over time. Favored by assassins, this weapon embodies the art of death and the thirst for blood in battle.",
	icon: "items/weapons/daggers/Dagger_46.png",
	price: 1300,
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
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 4,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 18,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "slashing",
					dice: "1d6",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
