import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dragons_breath",
	name: "Dragon's Breath",
	description:
		"Dragon's Breath is an ornate wand crafted from dark wood and adorned with dragon motifs. When wielded, it channels fiery magic to unleash powerful bursts of flame. Favored by elemental mages, this wand embodies the fierce spirit of dragons, allowing spellcasters to command fire with precision.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O887qHMJmHrl6p1Gm5h?alt=media&token=b6fc7281-b995-4f92-adc3-f2515db2d12f",
	price: 1240,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+4",
		type: "fire",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "intelligence",
				dc: {
					base: 18,
					attribute: "intelligence",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "vulnerable",
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
