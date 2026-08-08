import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "runesmiths_utility_belt",
	name: "Runesmith's Utility Belt",
	description:
		"Every clasp and compartment holds precisely the right tool for impending disaster.",
	icon: "items/armour/sets/cloth/Cloth14_belt.png",
	price: 3100,
	rarity: "legendary",
	restrictedToClassIds: ["artificer"],
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "acid",
		},
	],
	tags: [],
});
