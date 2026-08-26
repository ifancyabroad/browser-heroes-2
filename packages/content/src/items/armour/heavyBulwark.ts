import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "heavy_bulwark",
	name: "Heavy Bulwark",
	description: "A massive bulwark of reinforced steel, providing unparalleled defense in battle.",
	icon: "items/armour/shields/shield_41.png",
	price: 6000,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	armourClass: 7,
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: -2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 30,
		},
		{
			type: "modifyDamageTaken",
			operation: "add",
			value: -3,
		},
	],
	tags: [],
});
