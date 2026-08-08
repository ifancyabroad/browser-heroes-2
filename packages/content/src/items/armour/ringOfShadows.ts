import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ring_of_shadows",
	name: "Ring of Shadows",
	description:
		"A ring cloaked in darkness, granting its wearer the ability to blend into shadows.",
	icon: "items/armour/ring/Ring_47.png",
	price: 1700,
	rarity: "legendary",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
	],
	tags: [],
});
