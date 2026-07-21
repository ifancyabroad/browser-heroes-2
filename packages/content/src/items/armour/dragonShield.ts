import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dragon_shield",
	name: "Dragon Shield",
	icon: "items/armour/shields/shield_47.png",
	price: 1440,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	armourClass: 2,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
