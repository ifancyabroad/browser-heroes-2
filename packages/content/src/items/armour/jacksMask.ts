import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_mask",
	name: "Jack's Mask",
	icon: "items/armour/sets/leather/Leather9_head.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
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
			stat: "saveDcBonus",
			value: 3,
		},
	],
	tags: [],
});
