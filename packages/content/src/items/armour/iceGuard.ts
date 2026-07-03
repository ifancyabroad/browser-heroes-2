import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "ice_guard",
	name: "Ice Guard",
	description: "A shield encased in icy enchantments, warding off attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEd_Qa8Ppnwn6WL86V?alt=media&token=11d6e357-627b-45cb-89c4-6f51dec4aee8",
	price: 350,
	rarity: "common",
	type: "armour",
	slot: "shield",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 3,
		},
	],
	tags: [],
});
