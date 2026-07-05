import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "doomseers_wand",
	name: "Doomseer's Wand",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OEo-XG3BE5eugi3o0Zf?alt=media&token=bbaae2fb-3863-4f95-8eae-8c5db89fa48c",
	price: 2220,
	rarity: "legendary",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+5",
		type: "necrotic",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 40,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "intelligence",
				dc: {
					base: 22,
					attribute: "intelligence",
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
		{
			timing: "onHit",
			save: {
				attribute: "intelligence",
				dc: {
					base: 19,
					attribute: "intelligence",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					operation: "add",
					value: -4,
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
