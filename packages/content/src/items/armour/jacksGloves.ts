import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_gloves",
	name: "Jack's Gloves",
	icon: "items/armour/sets/leather/Leather9_gloves.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
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
			stat: "attackRollBonus",
			value: 3,
		},
	],
	tags: [],
});
