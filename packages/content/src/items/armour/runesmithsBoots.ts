import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "runesmiths_boots",
	name: "Runesmith's Boots",
	description:
		"Grounded soles and compact stabilisers keep their wearer standing when experiments erupt.",
	icon: "items/armour/sets/cloth/Cloth14_Boots.png",
	price: 3200,
	rarity: "legendary",
	restrictedToClassIds: ["artificer"],
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 20,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
	],
	tags: [],
});
