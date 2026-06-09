import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_belt",
	name: "Archmage's Belt",
	description: "This belt augments spellcasting abilities, a mark of the master mage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9dpRJB6wpOfSUAF24?alt=media&token=c6a46ff1-0009-408f-a13f-abf9b9f98e6c",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "belt",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
