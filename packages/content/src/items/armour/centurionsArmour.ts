import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_armour",
	name: "Centurion's Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGH3utgFlqilEXTLrc?alt=media&token=c9230c28-423e-4a78-a6e9-82ae0570b1a3",
	price: 1800,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 15,
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
	],
	tags: [],
});
