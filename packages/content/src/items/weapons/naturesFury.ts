import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "natures_fury",
	name: "Nature's Fury",
	description: "",
	icon: "items/weapons/bows/Bow_v2_08.png",
	price: 2600,
	rarity: "legendary",
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
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d6",
					duration: { unit: "turns", value: 4 },
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
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "poison",
					operation: "multiply",
					value: 1.4,
					duration: { unit: "turns", value: 2 },
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
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
