import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"Nightsong is an elegant sword with a sleek, dark blade that shimmers in low light. Infused with shadow magic, it grants its wielder enhanced stealth and agility. Favored by assassins and rogue warriors, this sword embodies the silent beauty and deadly precision of the night.",
	effects: [
		{
			damageType: "necrotic",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86i64bPy3o78ynB5JW?alt=media&token=57ad1820-9961-49a9-816d-322c87af1f3e",
	level: 4,
	max: 9,
	min: 4,
	name: "Nightsong",
	price: 1050,
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 50,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "sword",
	id: "nightsong",
});
