import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_tunic",
	name: "Umbral Tunic",
	icon: "items/armour/sets/leather/Leather8_Chest.png",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 16,
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
	],
	tags: [],
});
