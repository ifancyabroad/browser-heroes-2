import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "snake_tongue",
	name: "Snake Tongue",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAt06i5FZejZc6JogoT?alt=media&token=159f7546-ec58-461e-9e02-ac18c8517b32",
	price: 220,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+1",
		type: "poison",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 20,
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
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					dice: "1d4",
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
