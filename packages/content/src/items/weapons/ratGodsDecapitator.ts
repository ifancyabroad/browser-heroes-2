import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "rat_gods_decapitator",
	name: "Rat God's Decapitator",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCn-7fbuTczpdGL51Ob?alt=media&token=3215d999-1642-442d-8739-aaad4b503759",
	price: 2600,
	rarity: "common",
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+8",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
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
					base: 24,
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
					damageType: "slashing",
					dice: "1d10",
					durationTurns: 6,
				},
			],
		},
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 24,
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
					operation: "multiply",
					value: 1.25,
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
