import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "rat_gods_decapitator",
	name: "Rat God's Decapitator",
	description: "",
	icon: "items/weapons/axes/Axe_v2_51.png",
	price: 2600,
	rarity: "legendary",
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "2d6+5",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
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
					duration: { unit: "turns", value: 6 },
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
					damageType: "slashing",
					operation: "multiply",
					value: 1.4,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
