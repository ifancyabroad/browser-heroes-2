import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_crown",
	name: "Gold Crown",
	description:
		"A crown of enchanted gold that lends its wearer regal authority, commanding magic, and sovereign protection.",
	icon: "items/armour/helms/Helm_61_crown.png",
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
			stat: "charisma",
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
