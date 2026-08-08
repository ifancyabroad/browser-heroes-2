import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_mask",
	name: "Jack's Mask",
	icon: "items/armour/sets/leather/Leather9_head.png",
	price: 2500,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
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
