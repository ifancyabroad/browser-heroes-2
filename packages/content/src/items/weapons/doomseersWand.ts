import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "doomseers_wand",
	name: "Doomseer's Wand",
	description: "",
	icon: "items/weapons/wands/Wand_v2_42.png",
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
					value: -4,
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
