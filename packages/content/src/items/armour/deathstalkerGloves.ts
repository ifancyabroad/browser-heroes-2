import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_gloves",
	name: "Deathstalker Gloves",
	icon: "items/armour/sets/leather/Leather13_gloves.png",
	price: 2900,
	rarity: "legendary",
	restrictedToClassIds: ["rogue"],
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 3,
		},
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 5,
		},
	],
	tags: [],
});
