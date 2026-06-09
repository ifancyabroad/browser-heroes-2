import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "brigandine_armour",
	name: "Brigandine Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8Hu0onj7CWyDB2nP9R?alt=media&token=5bf34773-111f-4d1b-8f70-f64fa0104c6b",
	price: 740,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 14,
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
