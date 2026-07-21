import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "giants_gauntlets",
	name: "Giant's Gauntlets",
	description: "These gauntlets grant the power of giants, crushing foes with ease.",
	icon: "items/armour/gloves/Gloves_23.png",
	price: 1590,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
