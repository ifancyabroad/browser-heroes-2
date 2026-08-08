import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "runesmiths_goggles",
	name: "Runesmith's Goggles",
	description: "Calibrated lenses reveal structural weaknesses and unstable magical currents.",
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
