import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_belt",
	name: "Archmage's Belt",
	description: "This belt augments spellcasting abilities, a mark of the master mage.",
	icon: "items/armour/sets/cloth/Cloth17_belt.png",
	price: 2700,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
	],
	tags: [],
});
