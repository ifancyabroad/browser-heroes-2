import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "barbarians_tunic",
	name: "Barbarian's Tunic",
	icon: "items/armour/chest/BarbarianChest.png",
	price: 1400,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 17,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 5,
		},
	],
	tags: [],
});
