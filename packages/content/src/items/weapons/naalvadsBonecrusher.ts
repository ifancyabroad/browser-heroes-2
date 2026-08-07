import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "naalvads_bonecrusher",
	name: "Naalvad's Bonecrusher",
	description: "",
	icon: "items/weapons/hammers/Hammer_v2_20.png",
	price: 2540,
	rarity: "legendary",
	type: "weapon",
	weaponType: "warhammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "2d6+5",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 16,
					attribute: "constitution",
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
					value: -2,
					duration: { unit: "turns", value: 2 },
				},
				{
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "crushing",
					operation: "multiply",
					value: 1.25,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
