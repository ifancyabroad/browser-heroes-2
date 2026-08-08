import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_gauntlets",
	name: "Unholy Gauntlets",
	description: "Wreathed in darkness, these gauntlets embody the essence of the shadow.",
	icon: "items/armour/sets/mail/Mail16_gloves.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			value: 4,
		},
	],
	tags: [],
});
