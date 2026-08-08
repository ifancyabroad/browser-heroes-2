import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "naalvads_bonecrusher",
	name: "Naalvad's Bonecrusher",
	description:
		"Naalvad's colossal warhammer pulverizes armour and bone alike, leaving shattered foes exposed to every crushing blow that follows.",
	icon: "items/weapons/hammers/Hammer_v2_20.png",
	price: 5400,
	rarity: "legendary",
	type: "weapon",
	weaponType: "warhammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+5",
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
					base: 18,
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
					duration: { unit: "turns", value: 3 },
				},
			],
		},
		{
			timing: "onCrit",
			save: {
				attribute: "constitution",
				dc: {
					base: 18,
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "crushing",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
