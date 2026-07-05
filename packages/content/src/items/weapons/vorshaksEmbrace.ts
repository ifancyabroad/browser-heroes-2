import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "vorshaks_embrace",
	name: "Vorshak's Embrace",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCjb2zwjZOd3F8wf8Xa?alt=media&token=760f02f1-a8fd-456c-8903-aad88daba274",
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
			operation: "add",
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
