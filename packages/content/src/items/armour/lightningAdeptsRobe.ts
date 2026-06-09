import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lightning_adepts_robe",
	name: "Lightning Adept's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IBE_pHJnjHNYAUha-?alt=media&token=93035dd6-1659-45c8-9038-8f1479372b4f",
	price: 300,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 20,
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
