import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "ball_drainer",
	name: "Ball Drainer",
	description:
		"The Ball Drainer is a unique, spiked weapon designed for devastating impact. Its heavy head and jagged edges are made to crush and incapacitate foes, inflicting pain with each strike. Favored by ruthless fighters, this weapon emphasizes brute strength and intimidation on the battlefield.",
	icon: "items/weapons/clubs/Club_v2_20.png",
	price: 1380,
	rarity: "legendary",
	type: "weapon",
	weaponType: "flail",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d8+4",
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
