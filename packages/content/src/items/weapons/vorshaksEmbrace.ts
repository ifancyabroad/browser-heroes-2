import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "vorshaks_embrace",
	name: "Vorshak's Embrace",
	description: "",
	icon: "items/weapons/claws/BrassKnuckles_v2_11.png",
	price: 2250,
	rarity: "legendary",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4+5",
		type: "slashing",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "heal",
					target: "self",
					dice: "1d6",
				},
			],
		},
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
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "slashing",
					operation: "multiply",
					value: 1.25,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
