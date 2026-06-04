import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"Bloodletter is a sinister dagger with a jagged, crimson blade that gleams ominously. Designed for stealthy strikes, it inflicts deep wounds that bleed profusely, weakening foes over time. Favored by assassins, this weapon embodies the art of death and the thirst for blood in battle.",
	effects: [
		{
			difficulty: 18,
			duration: 2,
			effect: "bleed",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86vlV1PaMbJ7A5cuUH?alt=media&token=cdf12df8-5dfa-4d3e-91e5-156d0a9addfe",
	level: 4,
	max: 7,
	min: 4,
	name: "Bloodletter",
	price: 1300,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "bloodletter",
});
