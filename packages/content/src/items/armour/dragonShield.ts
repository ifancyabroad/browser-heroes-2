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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 3,
		},
	],
	tags: [],
});
