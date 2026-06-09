import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "naalvads_bonecrusher",
	name: "Naalvad's Bonecrusher",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OCjclL2ykXga6TDYLQX?alt=media&token=63e7045d-ac70-42a6-a88d-93c96a13975d",
	price: 2540,
	rarity: "common",
	type: "weapon",
	weaponType: "mace",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d7+8",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
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
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -6,
					durationTurns: 2,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "vulnerable",
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
