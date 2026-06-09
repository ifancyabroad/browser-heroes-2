import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "double_edged_blade",
	name: "Double Edged Blade",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsfwgsiG2apqDrTmKa?alt=media&token=87dd4d47-c113-49f3-b940-7a063995f5e5",
	price: 140,
	rarity: "common",
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
					damageType: "slashing",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
