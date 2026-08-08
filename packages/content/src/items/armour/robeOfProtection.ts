import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_protection",
	name: "Robe of Protection",
	description:
		"Powerful wards woven through this robe turn aside attacks, blunt harmful magic, and soften every blow that reaches its wearer.",
	icon: "items/armour/sets/cloth/Cloth5_Chest.png",
	price: 3200,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 14,
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyDamageTaken",
			operation: "add",
			value: -5,
		},
	],
	tags: [],
});
