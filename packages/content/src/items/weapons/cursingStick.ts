import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "cursing_stick",
	name: "Cursing Stick",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAshWX7bewXN5wSNS9O?alt=media&token=e048efc6-6ab4-4fe3-b5ee-241c7a3b3197",
	price: 230,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 12,
					attribute: "wisdom",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
