import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_gloves",
	name: "Jack's Gloves",
	icon: "items/armour/sets/leather/Leather9_gloves.png",
	price: 2900,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: 2,
		},
	],
	tags: [],
});
