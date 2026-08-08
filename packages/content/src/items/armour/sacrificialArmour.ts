import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sacrificial_armour",
	name: "Sacrificial Armour",
	description:
		"This blood-bound armour demands its wearer's safety as tribute, sharpening every strike while leaving flesh dangerously exposed.",
	icon: "items/armour/sets/leather/Leather16_Chest.png",
	price: 1740,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 16,
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "criticalRangeBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 4,
		},
		{
			type: "modifyDamageTaken",
			operation: "multiply",
			value: 1.25,
		},
	],
	tags: [],
});
