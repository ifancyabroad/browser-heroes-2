import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Ball Drainer is a unique, spiked weapon designed for devastating impact. Its heavy head and jagged edges are made to crush and incapacitate foes, inflicting pain with each strike. Favored by ruthless fighters, this weapon emphasizes brute strength and intimidation on the battlefield.",
	effects: [
		{
			max: 6,
			min: 1,
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86Njh57GkQCRerPm6K?alt=media&token=712959e4-0a0c-4b77-9249-bf7fff983f1b",
	level: 4,
	max: 11,
	min: 4,
	name: "Ball Drainer",
	price: 1380,
	size: "oneHanded",
	type: "weapon",
	weaponType: "mace",
	id: "ball_drainer",
});
