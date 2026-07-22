import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_gloves",
	name: "Deathstalker Gloves",
	icon: "items/armour/sets/leather/Leather13_gloves.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "acid",
		},
	],
	tags: [],
});
