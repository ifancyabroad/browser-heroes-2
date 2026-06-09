import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "bloodletter",
	name: "Bloodletter",
	description:
		"Bloodletter is a sinister dagger with a jagged, crimson blade that gleams ominously. Designed for stealthy strikes, it inflicts deep wounds that bleed profusely, weakening foes over time. Favored by assassins, this weapon embodies the art of death and the thirst for blood in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86vlV1PaMbJ7A5cuUH?alt=media&token=cdf12df8-5dfa-4d3e-91e5-156d0a9addfe",
	price: 1300,
	rarity: "common",
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
			save: {
				attribute: "constitution",
				dc: {
					base: 18,
					attribute: "constitution",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleeding",
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
