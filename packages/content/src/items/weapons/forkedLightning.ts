import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"Forked Lightning is a striking staff adorned with two jagged tips that crackle with electric energy. Designed to channel powerful lightning spells, it allows the wielder to unleash devastating bolts of electricity. Favored by storm mages, this staff embodies the raw fury of a thunderstorm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O882xmUlhB07RJmbt_a?alt=media&token=1c0d3884-6bfb-4b63-b25b-5de584796590",
	level: 4,
	max: 11,
	min: 4,
	name: "Forked Lightning",
	price: 1450,
	properties: [
		{
			name: "lightning",
			type: "damage",
			value: 50,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 50,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "forked_lightning",
});
