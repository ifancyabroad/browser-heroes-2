import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sacrificial_armour",
	name: "Sacrificial Armour",
	icon: "items/armour/sets/leather/Leather16_Chest.png",
	price: 1740,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 12,
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 3,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 3,
		},
	],
	tags: [],
});
