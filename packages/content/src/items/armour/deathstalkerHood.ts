import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_hood",
	name: "Deathstalker Hood",
	icon: "items/armour/sets/leather/Leather13_head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: -4,
		},
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
