import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_wing",
	name: "Gold Wing",
	description: "A shield crafted with golden wings, symbolizing protection and swift defense.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEgcZaaw2oFUsF7NBm?alt=media&token=798a61fe-2673-44dc-87e0-2a53737e8493",
	price: 1420,
	rarity: "legendary",
	type: "armour",
	slot: "shield",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
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
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 20,
		},
	],
	tags: [],
});
