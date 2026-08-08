import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_boots",
	name: "Jack's Boots",
	icon: "items/armour/sets/leather/Leather9_boots.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
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
