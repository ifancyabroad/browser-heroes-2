import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "natures_fury",
	name: "Nature's Fury",
	description:
		"A bow steeped in virulent natural magic, its arrows poisoning their victims and leaving them vulnerable to further venom.",
	icon: "items/weapons/bows/Bow_v2_08.png",
	price: 4400,
	rarity: "legendary",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d8+5",
		type: "piercing",
		damageClass: "physical",
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
					base: 18,
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
					damageClass: "magical",
					dice: "2d4",
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
					damageType: "poison",
					duration: { unit: "turns", value: 3 },
				},
			],
		},
	],
	tags: [],
});
