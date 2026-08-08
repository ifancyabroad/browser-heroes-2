import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "runesmiths_gloves",
	name: "Runesmith's Gloves",
	description: "Conductive gloves that deliver volatile compounds with exacting precision.",
	icon: "items/armour/sets/cloth/Cloth14_gloves.png",
	price: 2900,
	rarity: "legendary",
	restrictedToClassIds: ["artificer"],
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
			damageType: "acid",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 5,
		},
	],
	tags: [],
});
