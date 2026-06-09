import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "elemental_locket",
	name: "Elemental Locket",
	description: "Enhances elemental magic, granting mastery over the natural elements.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9ZrGaIiOBuE0sHpR1?alt=media&token=ab576227-488d-4a84-bf72-8ccd81b04e32",
	price: 300,
	rarity: "common",
	type: "armour",
	slot: "amulet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
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
