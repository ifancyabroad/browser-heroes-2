import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Corroding Blade is a sinister weapon with a jagged edge that emits a faint green glow. Coated in a potent acid, it can eat through armor and flesh with each strike. This blade is favored by ruthless assassins, designed to inflict devastating damage that lingers long after the blow.",
	effects: [
		{
			damageType: "acid",
			max: 6,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 18,
			duration: 2,
			modifier: "dexterity",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -2,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86w6i469JpHsIqXKtr?alt=media&token=8643f1da-928f-437d-b2de-f1c2ec8d7626",
	level: 3,
	max: 6,
	min: 3,
	name: "Corroding Blade",
	price: 500,
	size: "oneHanded",
	type: "weapon",
	weaponType: "dagger",
	id: "corroding_blade",
});
