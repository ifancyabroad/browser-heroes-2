import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_wing",
	name: "Gold Wing",
	description:
		"A feather-light golden shield that turns swift movement into precise attacks and evasive defence.",
	icon: "items/armour/shields/shield_48.png",
	price: 1420,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	armourClass: 5,
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
	tags: [],
});
