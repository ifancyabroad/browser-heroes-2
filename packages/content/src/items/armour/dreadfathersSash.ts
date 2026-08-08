import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_sash",
	name: "Dreadfather's Sash",
	icon: "items/armour/sets/cloth/Cloth7_belt.png",
	price: 2700,
	rarity: "legendary",
	restrictedToClassIds: ["priest"],
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
		{
			type: "modifyHealing",
			multiplier: 1.5,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
	tags: [],
});
