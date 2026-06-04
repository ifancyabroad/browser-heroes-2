import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "fire",
	description:
		"Dragon's Breath is an ornate wand crafted from dark wood and adorned with dragon motifs. When wielded, it channels fiery magic to unleash powerful bursts of flame. Favored by elemental mages, this wand embodies the fierce spirit of dragons, allowing spellcasters to command fire with precision.",
	effects: [
		{
			difficulty: 18,
			duration: 2,
			modifier: "intelligence",
			properties: [
				{
					name: "fire",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O887qHMJmHrl6p1Gm5h?alt=media&token=b6fc7281-b995-4f92-adc3-f2515db2d12f",
	level: 4,
	max: 8,
	min: 5,
	name: "Dragon's Breath",
	price: 1240,
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 20,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "dragons_breath",
});
