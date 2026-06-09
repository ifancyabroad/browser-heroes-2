import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "corroding_blade",
	name: "Corroding Blade",
	description:
		"The Corroding Blade is a sinister weapon with a jagged edge that emits a faint green glow. Coated in a potent acid, it can eat through armor and flesh with each strike. This blade is favored by ruthless assassins, designed to inflict devastating damage that lingers long after the blow.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86w6i469JpHsIqXKtr?alt=media&token=8643f1da-928f-437d-b2de-f1c2ec8d7626",
	price: 500,
	rarity: "common",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+2",
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
					damageType: "acid",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onHit",
			save: {
				attribute: "dexterity",
				dc: {
					base: 18,
					attribute: "dexterity",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -2,
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
