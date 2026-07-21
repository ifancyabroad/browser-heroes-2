import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_boots",
	name: "Archmage's Boots",
	description: "Boots infused with arcane energy, enhancing spellcasting prowess.",
	icon: "items/armour/sets/cloth/Cloth17_Boots.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
	],
	tags: [],
});
