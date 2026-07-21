import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_boots",
	name: "Dreadfather's Boots",
	icon: "items/armour/sets/cloth/Cloth7_Boots.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
