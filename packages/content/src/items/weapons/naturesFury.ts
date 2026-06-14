import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "natures_fury",
	name: "Nature's Fury",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OEnxXfaHmNcWzFN8xR3?alt=media&token=ae4077c1-93e1-4fff-8454-71d8151be4f6",
	price: 2600,
	rarity: "common",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+5",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 4,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 19,
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
					statusId: "poisoned",
					durationTurns: 4,
				},
			],
		},
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 19,
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
					statusId: "vulnerable",
					durationTurns: 2,
				},
			],
		},
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "poison",
					dice: "1d8+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
