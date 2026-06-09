import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "steel_plated_girdle",
	name: "Steel Plated Girdle",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHrcGna4xel3CSG1Amx?alt=media&token=d9acd34d-605e-4ea0-b9ab-997a7693d0b1",
	price: 680,
	rarity: "common",
	type: "armour",
	slot: "belt",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
