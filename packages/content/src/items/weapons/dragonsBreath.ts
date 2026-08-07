import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dragons_breath",
	name: "Dragon's Breath",
	description:
		"Dragon's Breath is an ornate wand crafted from dark wood and adorned with dragon motifs. When wielded, it channels fiery magic to unleash powerful bursts of flame. Favored by elemental mages, this wand embodies the fierce spirit of dragons, allowing spellcasters to command fire with precision.",
	icon: "items/weapons/wands/Wand_v2_71.png",
	price: 1240,
	rarity: "legendary",
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
			value: 2,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "intelligence",
				dc: {
					base: 15,
					attribute: "intelligence",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "fire",
					operation: "multiply",
					value: 1.25,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
