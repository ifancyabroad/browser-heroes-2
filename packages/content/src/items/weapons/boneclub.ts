import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "boneclub",
	name: "Boneclub",
	description:
		"The Boneclub is a crude weapon crafted from a single large bone, often from a beast of considerable size. Its surface is rough and jagged, adding to its blunt force when swung. Primitive but effective, it’s favored by those who embrace a raw, untamed fighting style.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O838EeKMsy_Xw7WPyND?alt=media&token=12b74f85-8519-4eb3-b78f-ad018ae687eb",
	price: 40,
	rarity: "common",
	type: "weapon",
	weaponType: "club",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: -2,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 12,
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
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
