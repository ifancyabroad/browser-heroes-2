import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_gloves",
	name: "Deathstalker Gloves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD696zVnfid6RFE48E-?alt=media&token=212967f9-cca1-4cf6-abd6-3b2a82d87e56",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "add",
			value: 40,
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
