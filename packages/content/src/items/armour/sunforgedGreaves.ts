import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_greaves",
	name: "Sunforged Greaves",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGAnTlbkzA3DMLPVrC?alt=media&token=02d97c5c-db82-428f-819b-4f678f41b5f8",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
