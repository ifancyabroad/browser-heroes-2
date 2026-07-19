import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "ball_drainer",
	name: "Ball Drainer",
	description:
		"The Ball Drainer is a unique, spiked weapon designed for devastating impact. Its heavy head and jagged edges are made to crush and incapacitate foes, inflicting pain with each strike. Favored by ruthless fighters, this weapon emphasizes brute strength and intimidation on the battlefield.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86Njh57GkQCRerPm6K?alt=media&token=712959e4-0a0c-4b77-9249-bf7fff983f1b",
	price: 1380,
	rarity: "legendary",
	type: "weapon",
	weaponType: "mace",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [],
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
	],
	tags: [],
});
