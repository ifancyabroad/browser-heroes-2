import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"Dwarven Thunder is a sturdy warhammer with a heavy head that resonates with a deep sound upon impact. Crafted by skilled dwarven smiths, it delivers devastating blows, often stunning foes. This weapon embodies the strength and craftsmanship of dwarven warriors.",
	effects: [
		{
			damageType: "lightning",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O83CckcCZNQbGuIhCwy?alt=media&token=7f94fa9c-7af4-401b-82f4-0a53766bf53c",
	level: 4,
	max: 14,
	min: 5,
	name: "Dwarven Thunder",
	price: 1440,
	properties: [
		{
			name: "lightning",
			type: "resistance",
			value: 50,
		},
		{
			name: "lightning",
			type: "damage",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "hammer",
	id: "dwarven_thunder",
});
