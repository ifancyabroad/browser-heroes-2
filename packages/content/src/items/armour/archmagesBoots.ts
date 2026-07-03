import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_boots",
	name: "Archmage's Boots",
	description: "Boots infused with arcane energy, enhancing spellcasting prowess.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDNmAFnZcDHdtAbyd1?alt=media&token=d5274bd0-43ff-4b7d-979a-65d5137075cf",
	price: 1600,
	rarity: "common",
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
