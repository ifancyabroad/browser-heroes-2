import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "venom_blade",
	name: "Venom Blade",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsywEq4QvRRmq2hLKG?alt=media&token=174229a2-1d4a-4fbd-89da-765fd5d8f3a2",
	price: 250,
	rarity: "common",
	type: "weapon",
	weaponType: "sword",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
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
					type: "applyStatus",
					target: "enemy",
					statusId: "poisoned",
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
