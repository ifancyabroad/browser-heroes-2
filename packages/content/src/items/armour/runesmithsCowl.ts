import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "runesmiths_cowl",
	name: "Runesmith's Cowl",
	description:
		"A rune-lined cowl whose brass respirator filters toxic fumes and reveals unstable magical currents.",
	icon: "items/armour/sets/cloth/Cloth14_Head.png",
	price: 2500,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
	],
	tags: [],
});
