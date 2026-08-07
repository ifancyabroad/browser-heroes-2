import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_belt",
	name: "Jack's Belt",
	description: "Worn by versatile adventurers, this belt aids in mastering various skills.",
	icon: "items/armour/sets/leather/Leather9_belt.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 20,
		},
	],
	tags: [],
});
